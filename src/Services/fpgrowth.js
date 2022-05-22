function generateItemCount(transactionData) {
  let itemCount = {};
  for (let i = 0; i < transactionData.length; i++) {
    for (let j = 0; j < transactionData[i].length; j++) {
      if (itemCount[transactionData[i][j]] === undefined) {
        itemCount[transactionData[i][j]] = 1;
      } else {
        itemCount[transactionData[i][j]]++;
      }
    }
  }
  return itemCount;
}

export function generateFPGrowthFrequentItemsets(minSupport, transactionData) {
  let itemCount = generateItemCount(transactionData);

  let FPGrowthTree = { children: {}, count: 1, parent: null };
  let itemsLocations = {};
  for (let i = 0; i < transactionData.length; i++) {
    let sortedTransaction = sortTransaction(itemCount, [...transactionData[i]]);
    let parent = { name: null, obj: FPGrowthTree };
    let currentPointer = FPGrowthTree.children;
    for (let j = 0; j < transactionData[i].length; j++) {
      if (currentPointer[sortedTransaction[j]] === undefined) {
        currentPointer[sortedTransaction[j]] = {
          count: 1,
          children: {},
          parent: parent,
        };
        if (itemsLocations[sortedTransaction[j]] === undefined) {
          itemsLocations[sortedTransaction[j]] = [];
        }
        itemsLocations[sortedTransaction[j]].push(
          currentPointer[sortedTransaction[j]]
        );
      } else {
        currentPointer[sortedTransaction[j]].count++;
      }
      parent = {
        name: sortedTransaction[j],
        obj: currentPointer[sortedTransaction[j]],
      };
      currentPointer = currentPointer[sortedTransaction[j]].children;
    }
  }

  // let patternTable = {};
  // let itemsLocationsKeys = Object.keys(itemsLocations);
  // for (let j = itemsLocationsKeys.length - 1; j >= 0; j--) {
  //   let conditionalPatternBase = [];
  //   for(let i = 0; i < itemsLocations[itemsLocationsKeys[j]].length; i++) {
  //     conditionalPatternBase.push({items: });
  //   }
  //   patternTable[itemsLocationsKeys[j]] = {item: itemsLocationsKeys[j], conditionalPatternBase: []};
  //   if (itemCount[itemsLocationsKeys[j]] >= minSupport) {
  //     patternTable[itemsLocationsKeys[j]] = itemsLocations[itemsLocationsKeys[j]];
  //   }
  // }

  // let frequentItemsets = [];

  return { FPGrowthTree, itemsLocations };
}

function sortTransaction(itemCount, arrayToSort) {
  return arrayToSort.sort((a, b) => {
    if (itemCount[a] > itemCount[b]) {
      return -1;
    } else if (itemCount[a] < itemCount[b]) {
      return 1;
    } else {
      return 0;
    }
  });
}
