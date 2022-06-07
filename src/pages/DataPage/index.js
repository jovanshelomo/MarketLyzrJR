import { fileParser } from "../../Services/fileHandler";
import "./index.css";
import { useRef } from "react";
import ConditionalLoading from "../../components/ConditionalLoading";

function DataPage(props) {
  const inputEl = useRef(null);
  const dropAreaEl = useRef(null);

  function fileDragEnter(e) {
    e.preventDefault();
    dropAreaEl.current.style.backgroundColor = "#f1f5fb";
  }

  function fileDragLeave(e) {
    e.preventDefault();
    dropAreaEl.current.style.backgroundColor = "#ffffff";
  }

  function fileDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function fileDrop(e) {
    e.preventDefault();
    inputEl.current.files = e.dataTransfer.files;
    fileInputted();
    dropAreaEl.current.style.backgroundColor = "#ffffff";
  }

  function fileInputted() {
    const file = inputEl.current.files[0];
    //check if there is a file
    if (!file) {
      console.log("No file selected");
      return;
    }

    props.setFileName(file.name);
    //check if file format is supported
    if (
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      file.type !== "text/csv"
    ) {
      props.setNotSupportedInfo(true);
      props.setTransactionData([]);
      props.setUniqueItems([]);
      return;
    }

    props.setNotSupportedInfo(false);
    fileParser(file).then((result) => {
      props.setTransactionData(result);
    });
    props.setIsLoading(true);
  }

  return (
    <>
      <div className="container">
        <div className="uploadFileTitle">
          <h1>Upload Transaction Data</h1>
        </div>
        <div className="blockContainer">
          <b>HOW TO USE</b><br/>
          1. choose a file with extension <strong>.csv</strong> or <strong>.xlsx</strong>. example: <a href="/testData.csv" download="testData">.csv</a>, <a href="/testData.xlsx" download="testData">.xlsx</a> <br/>
          2. you can analyze support and confidence by yourself or jump straight to conclusion
        </div>
        <div className="blockContainer uploadFileContainer">
          <div
            className="uploadFileArea"
            onDragEnter={fileDragEnter}
            onDragLeave={fileDragLeave}
            onDragEnd={fileDragLeave}
            onDragOver={fileDragOver}
            onDrop={fileDrop}
            ref={dropAreaEl}
          >
            <input
              className="uploadFileInput"
              ref={inputEl}
              type="file"
              id="file"
              accept=".csv,.xlsx"
              name="file"
              onChange={fileInputted}
            />
            <p className="uploadFileText">
              <b>Drag 'n drop</b> file here
              <br />
              OR
            </p>
            <label className="uploadFileLabel" htmlFor="file">
              Choose a file
            </label>
          </div>
          {props.notSupportedInfo ? (
            <p className="fileName notSupported">
              File {props.fileName} is not supported
            </p> //if not supported then show the text
          ) : (
            props.fileName && ( //if there is a file then show the file name
              <p className="fileName">{props.fileName}</p>
            )
          )}
        </div>
        <ConditionalLoading isLoading={props.isLoading}>
          {props.uniqueItems.length > 0 && (
            <div className="blockContainer listItemContainer">
              <h2 className="listItemTitle">
                {"List of Items (" + props.uniqueItems.length + ")"}
              </h2>
              {props.transactionData &&
                props.uniqueItems.map((item, index) => (
                  <ul key={index}>{item}</ul>
                ))}
            </div>
          )}
        </ConditionalLoading>
      </div>
    </>
  );
}
export default DataPage;
