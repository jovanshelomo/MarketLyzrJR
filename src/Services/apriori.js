function combinations(set, k) {
  var i, j, combs, head, tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (!k || k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k === set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k === 1) {
    return set.map((item) => [item]);
  }

  // Assert {1 < k < set.length}

  // Algorithm description:
  // To get k-combinations of a set, we want to join each element
  // with all (k-1)-combinations of the other elements. The set of
  // these k-sized sets would be the desired result. However, as we
  // represent sets with lists, we need to take duplicates into
  // account. To avoid producing duplicates and also unnecessary
  // computing, we use the following approach: each element i
  // divides the list into three: the preceding elements, the
  // current element i, and the subsequent elements. For the first
  // element, the list of preceding elements is empty. For element i,
  // we compute the (k-1)-computations of the subsequent elements,
  // join each with the element i, and store the joined to the set of
  // computed k-combinations. We do not need to take the preceding
  // elements into account, because they have already been the i:th
  // element so they are already computed and stored. When the length
  // of the subsequent list drops below (k-1), we cannot find any
  // (k-1)-combs, hence the upper limit for the iteration:
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

export function generateUniqueItems(transactionData) {
  let uniqueItems = new Set();
  for (let i = 0; i < transactionData.length; i++) {
    for (let j = 0; j < transactionData[i].length; j++) {
      uniqueItems.add(transactionData[i][j]);
    }
  }
  return Array.from(uniqueItems);
}

//support

//example:
//input:
//itemsets = [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
//result = [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
function generateNextFrequentItemsets(itemsets) {
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
          !itemsetAlreadyInsideArray(nextFreq, newItemset)
        ) {
          nextFreq.push([...newItemset]);
        }
      }
    }
  }
  return nextFreq;
}

function itemsetAlreadyInsideArray(parentArray, childSet) {
  for (let i = 0; i < parentArray.length; i++) {
    let match = true;
    for (let j = 0; j < parentArray[i].length; j++) {
      if (!childSet.has(parentArray[i][j])) {
        match = false;
        break;
      }
    }
    if (match) {
      return true;
    }
  }
  return false;
}

function arrayContentEquals(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (!array1.includes(array2[i]) || !array2.includes(array1[i])) {
      return false;
    }
  }
  return true;
}

export function generateSupport(minSupport, uniqueItems, transactionData) {
  let currentItemsets = uniqueItems.map((item) => [item]);
  let lolos = [];
  let frequentItemsets = [];
  do {
    let frequentItemset = [];
    for (let itemset of currentItemsets) {
      let support = getSupport(itemset, transactionData);
      if (support >= minSupport) {
        frequentItemset.push({
          items: itemset,
          support: support,
        });
        lolos.push(itemset);
      }
    }
    frequentItemsets.push(frequentItemset);
    currentItemsets = generateNextFrequentItemsets(lolos);
    lolos = [];
  } while (currentItemsets.length > 0);

  let sortedFrequentItemsets = frequentItemsets.map((itemset) =>
    sortSupport(itemset)
  );
  return sortedFrequentItemsets;
}

function getSupport(itemset, transactionData) {
  let support = 0;
  for (let transaction of transactionData) {
    if (isSubset(itemset, transaction)) {
      support++;
    }
  }
  return support;
}

function isSubset(itemset, transaction) {
  for (let item of itemset) {
    if (!transaction.includes(item)) {
      return false;
    }
  }
  return true;
}

function sortSupport(supportSet) {
  return supportSet.sort((a, b) => {
    return b.support - a.support;
  });
}

//confidence
export function generateConfidence(minConfidence, supportSet) {
  let confidenceSets = [];
  for (let i = 1; i < supportSet.length; i++) {
    let confidenceSet = [];
    for (let j = 0; j < supportSet[i].length; j++) {
      for (let k = 1; k < supportSet[i][j].items.length; k++) {
        let setCombinations = combinations(supportSet[i][j].items, k);
        for (let l = 0; l < setCombinations.length; l++) {
          let tempAntecedent = new Set(supportSet[i][j].items);
          let consequent = setCombinations[l];
          for (let cons of consequent) {
            tempAntecedent.delete(cons);
          }
          let antecedent = [...tempAntecedent];
          const confidence = getConfidence(
            antecedent,
            supportSet[i][j].support,
            supportSet[antecedent.length - 1]
          );
          if (confidence > minConfidence) {
            confidenceSet.push({
              antecedent: antecedent,
              consequent: consequent,
              confidence: confidence,
            });
          }
        }
      }
    }
    confidenceSets.push(confidenceSet);
  }
  let sortedConfidence = confidenceSets.map((confidenceSet) =>
    sortConfidence(confidenceSet)
  );
  return sortedConfidence;
}

function getConfidence(antecedent, supportXY, nSupportSets) {
  let supportX = findSupport(antecedent, nSupportSets);
  return (supportXY * 100) / supportX;
}

function sortConfidence(confidenceSet) {
  return confidenceSet.sort((a, b) => {
    return b.confidence - a.confidence;
  });
}

//lift
export function generateLift(supportSets, confidenceSets, totalItemsAmount) {
  let liftSets = [];
  for (let i = 0; i < confidenceSets.length; i++) {
    let liftSet = [];
    for (let j = 0; j < confidenceSets[i].length; j++) {
      if (
        !findDoubleLift(
          liftSet,
          confidenceSets[i][j].antecedent,
          confidenceSets[i][j].consequent
        )
      ) {
        let supportCons = findSupport(
          confidenceSets[i][j].consequent,
          supportSets[confidenceSets[i][j].consequent.length - 1]
        );
        let lift = getLift(
          confidenceSets[i][j].confidence,
          (supportCons * 100) / totalItemsAmount
        );

        liftSet.push({
          items: [
            confidenceSets[i][j].antecedent,
            confidenceSets[i][j].consequent,
          ],
          lift: lift,
          support: totalItemsAmount,
        });
      }
    }
    liftSets.push(liftSet);
  }
  let sortedLift = liftSets.map((liftSet) => sortLift(liftSet));
  return sortedLift;
}

function findSupport(itemset, nSupportSets) {
  for (let i = 0; i < nSupportSets.length; i++) {
    if (arrayContentEquals(itemset, nSupportSets[i].items)) {
      return nSupportSets[i].support;
    }
  }
  return 0;
}

function findDoubleLift(currentLiftSet, antecedent, consequent) {
  for (let i = 0; i < currentLiftSet.length; i++) {
    if (
      arrayContentEquals(currentLiftSet[i].items[0], consequent) &&
      arrayContentEquals(currentLiftSet[i].items[1], antecedent)
    ) {
      return true;
    }
  }
  return false;
}

function getLift(confidence, support) {
  return confidence / support;
}

function sortLift(liftSet) {
  return liftSet.sort((a, b) => {
    return b.lift - a.lift;
  });
}
