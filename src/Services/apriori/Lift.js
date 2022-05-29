import MiscMethods from "./MiscMethods";
import Support from "./Support";

export default class Lift {
  static generateLift(supportSets, confidenceSets, totalItemsAmount) {
    let liftSets = [];
    //iterate through confidence sets frequent itemset number
    for (let i = 0; i < confidenceSets.length; i++) {
      let liftSet = [];
      //iterate through items in confidence set
      for (let j = 0; j < confidenceSets[i].length; j++) {
        if (
          !this.findDoubleLift(
            liftSet,
            confidenceSets[i][j].antecedent,
            confidenceSets[i][j].consequent
          )
        ) {
          let supportCons = Support.findSupport(
            confidenceSets[i][j].consequent,
            supportSets[confidenceSets[i][j].consequent.length - 1]
          );
          let lift = this.getLift(
            confidenceSets[i][j].confidence,
            (supportCons * 100) / totalItemsAmount
          );

          liftSet.push({
            items: [
              confidenceSets[i][j].antecedent,
              confidenceSets[i][j].consequent,
            ],
            lift: lift,
          });
        }
      }
      liftSets.push(liftSet);
    }
    let sortedLift = liftSets.map((liftSet) => this.sortLift(liftSet));
    return sortedLift;
  }

  static getLift(confidence, support) {
    return confidence / support;
  }

  static sortLift(liftSet) {
    return liftSet.sort((a, b) => {
      return b.lift - a.lift;
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

  static findDoubleLift(currentLiftSet, antecedent, consequent) {
    for (let i = 0; i < currentLiftSet.length; i++) {
      if (
        MiscMethods.arrayContentEquals(
          currentLiftSet[i].items[0],
          consequent
        ) &&
        MiscMethods.arrayContentEquals(currentLiftSet[i].items[1], antecedent)
      ) {
        return true;
      }
    }
    return false;
  }
}
