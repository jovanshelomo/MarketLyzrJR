import MiscMethods from "./MiscMethods";
import Support from "./Support";

export default class Confidence {
  static generateConfidence(minConfidence, supportSet) {
    let confidenceSets = [];
    for (let i = 1; i < supportSet.length; i++) {
      let confidenceSet = [];
      for (let j = 0; j < supportSet[i].length; j++) {
        for (let k = 1; k < supportSet[i][j].items.length; k++) {
          let setCombinations = MiscMethods.combinations(
            supportSet[i][j].items,
            k
          );
          for (let l = 0; l < setCombinations.length; l++) {
            let tempAntecedent = new Set(supportSet[i][j].items);
            let consequent = setCombinations[l];
            for (let cons of consequent) {
              tempAntecedent.delete(cons);
            }
            let antecedent = [...tempAntecedent];
            const confidence = this.getConfidence(
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
      this.sortConfidence(confidenceSet)
    );
    return sortedConfidence;
  }

  static getConfidence(antecedent, supportXY, nSupportSets) {
    let supportX = Support.findSupport(antecedent, nSupportSets);
    return (supportXY * 100) / supportX;
  }

  static sortConfidence(confidenceSet) {
    return confidenceSet.sort((a, b) => {
      return b.confidence - a.confidence;
    });
  }
}
