import Support from "./Support";
import Confidence from "./Confidence";
import Lift from "./Lift";
import UniqueItems from "./UniqueItems";

export default class Apriori {
  //generate unique items
  static generateUniqueItems(transactionData) {
    return UniqueItems.generateUniqueItems(transactionData);
  }

  //generate support set
  static generateSupportSet(minSupport, uniqueItems, transactionData) {
    return Support.generateSupport(minSupport, uniqueItems, transactionData);
  }

  //generate confidence set
  static generateConfidenceSet(minConfidence, supportSet) {
    return Confidence.generateConfidence(minConfidence, supportSet);
  }

  //generate lift set
  static generateLiftSet(supportSet, confidenceSet, totalItemsAmount) {
    return Lift.generateLift(supportSet, confidenceSet, totalItemsAmount);
  }
}
