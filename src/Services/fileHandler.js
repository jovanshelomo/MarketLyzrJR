import readXlsxFile from "read-excel-file";

export async function fileParser(file) {
  let result = null;
  //if file is CSV
  if (file.type === "text/csv") {
    return await csvToJSON(file);
  }
  //if file is XLSX
  else if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return await xlsxToJSON(file);
  }
  return result;
}

async function csvToJSON(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const csv = event.target.result;
      const rows = csv.split(/\r?\n/);
      const result = [];
      for (let row of rows) {
        row = row.split(","); //split cells
        row = row.filter((cell) => cell); //remove invalid cells
        row = [...new Set(row)]; //remove duplicates
        row.sort(); //sort cells alphabetically
        result.push(row);
      }
      resolve(result);
    };
    reader.readAsText(file);
  });
}

async function xlsxToJSON(file) {
  const rows = await readXlsxFile(file);
  const result = [];
  for(let row of rows){
    row = row.filter((cell) => cell); //remove invalid cells
    row = [...new Set(row)]; //remove duplicates
    row.sort(); //sort cells alphabetically
    result.push(row);
  }
  return result;
}
