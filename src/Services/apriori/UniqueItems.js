export default class UniqueItems{
  static generateUniqueItems(transactionData) {
    let uniqueItems = new Set();
    for (let i = 0; i < transactionData.length; i++) {
      for (let j = 0; j < transactionData[i].length; j++) {
        uniqueItems.add(transactionData[i][j]);
      }
    }
    return Array.from(uniqueItems);
  }
}
