import MiscMethods from "./MiscMethods";

export default class Support {
  static generateSupport(minSupport, uniqueItems, transactionData) {
    let currentItemsets = uniqueItems.map((item) => [item]);
    let lolos = [];
    let frequentItemsets = [];
    do {
      let frequentItemset = [];
      for (let itemset of currentItemsets) {
        let support = this.getSupport(itemset, transactionData);
        if (support >= minSupport) {
          frequentItemset.push({
            items: itemset,
            support: support,
          });
          lolos.push(itemset);
        }
      }
      frequentItemsets.push(frequentItemset);
      currentItemsets = this.generateNextFrequentItemsets(lolos);
      lolos = [];
    } while (currentItemsets.length > 0);

    let sortedFrequentItemsets = frequentItemsets.map((itemset) =>
      this.sortSupport(itemset)
    );
    return sortedFrequentItemsets;
  }

  //example:
  //input:
  //itemsets = [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
  //result = [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
  static generateNextFrequentItemsets(itemsets) {
    if (itemsets.length === 0) {
      return [];
    }
    const nextFreqLength = itemsets[0].length + 1;
    const nextFreq = [];

    for (let i = 0; i < itemsets.length; i++) {
      for (let j = i + 1; j < itemsets.length; j++) {
        if (itemsets[i].length === itemsets[j].length) {
          const newItemset = new Set([...itemsets[i], ...itemsets[j]]);
          if (
            newItemset.size === nextFreqLength &&
            !MiscMethods.itemsetAlreadyInsideArray(nextFreq, newItemset)
          ) {
            nextFreq.push([...newItemset]);
          }
        }
      }
    }
    return nextFreq;
  }

  static getSupport(itemset, transactionData) {
    let support = 0;
    for (let transaction of transactionData) {
      if (MiscMethods.isSubset(itemset, transaction)) {
        support++;
      }
    }
    return support;
  }

  static sortSupport(supportSet) {
    return supportSet.sort((a, b) => {
      return b.support - a.support;
    });
  }

  static findSupport(itemset, nSupportSets) {
    for (let i = 0; i < nSupportSets.length; i++) {
      if (MiscMethods.arrayContentEquals(itemset, nSupportSets[i].items)) {
        return nSupportSets[i].support;
      }
    }
    return 0;
  }
}
