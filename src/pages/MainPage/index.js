import "./index.css";
import DataPage from "../DataPage";
import ConfidencePage from "../ConfidencePage";
import SupportPage from "../SupportPage";
import { useEffect, useState } from "react";
import ConclusionPage from "../ConclusionPage";
import {
  generateSupport,
  generateConfidence,
  generateLift,
} from "../../Services/apriori";
import { generateFPGrowthFrequentItemsets } from "../../Services/fpgrowth";
import { useDebounce } from "../../Services/etc";
function MainPage(props) {
  let [activeTab, setActiveTab] = useState(1);
  const [fileName, setFileName] = useState(null);
  const [notSupportedInfo, setNotSupportedInfo] = useState(false);

  let [transactionData, setTransactionData] = useState([]);
  let [uniqueItems, setUniqueItems] = useState([]);
  let [support, setSupport] = useState(40);
  let [confidence, setConfidence] = useState(40);
  let [supportSets, setSupportSets] = useState([]);
  let [confidenceSets, setConfidenceSets] = useState([]);
  let [liftSets, setLiftSets] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const debounceSupport = useDebounce(support);
  const debounceConfidence = useDebounce(confidence);

  const regenerateSupport = async () => {
    let minSupport = Math.ceil((support * transactionData.length) / 100);
    let supportSets = generateSupport(minSupport, uniqueItems, transactionData);
    console.log(supportSets);
    setSupportSets(supportSets);
    setIsLoading(false);
  };

  const regenerateConfidence = async () => {
    let minConfidence = confidence;
    let confidenceSets = generateConfidence(
      minConfidence,
      supportSets,
      transactionData
    );
    console.log(confidenceSets);
    setConfidenceSets(confidenceSets);
    setIsLoading(false);
  };

  const regenerateLift = async () => {
    let liftSets = generateLift(
      supportSets,
      confidenceSets,
      transactionData.length
    );
    console.log(liftSets);
    setLiftSets(liftSets);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
  }, [support, confidence]);

  useEffect(() => {
    regenerateSupport().catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [debounceSupport, transactionData]);

  useEffect(() => {
    regenerateConfidence().catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [debounceConfidence, supportSets]);

  useEffect(() => {
    regenerateLift().catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [confidenceSets]);

  return (
    <>
      <div className="container">
        <div className="tabBar">
          <button
            className={"tabItem" + (activeTab === 1 ? " active" : "")}
            onClick={() => setActiveTab(1)}
          >
            Data
          </button>
          <button
            className={"tabItem" + (activeTab === 2 ? " active" : "")}
            onClick={() => setActiveTab(2)}
          >
            Support
          </button>
          <button
            className={"tabItem" + (activeTab === 3 ? " active" : "")}
            onClick={() => setActiveTab(3)}
          >
            Confidence
          </button>
          <button
            className={"tabItem" + (activeTab === 4 ? " active" : "")}
            onClick={() => setActiveTab(4)}
          >
            Conclusion
          </button>
        </div>
        {activeTab === 1 && (
          <DataPage
            fileName={fileName}
            setFileName={setFileName}
            notSupportedInfo={notSupportedInfo}
            setNotSupportedInfo={setNotSupportedInfo}
            transactionData={transactionData}
            setTransactionData={setTransactionData}
            uniqueItems={uniqueItems}
            setUniqueItems={setUniqueItems}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}
        {activeTab === 2 && (
          <SupportPage
            transactionData={transactionData}
            uniqueItems={uniqueItems}
            support={support}
            setSupport={setSupport}
            supportSets={supportSets}
            isLoading={isLoading}
          />
        )}
        {activeTab === 3 && (
          <ConfidencePage
            confidence={confidence}
            setConfidence={setConfidence}
            confidenceSets={confidenceSets}
            isLoading={isLoading}
          />
        )}
        {activeTab === 4 && (
          <ConclusionPage
            liftSets={liftSets}
            isLoading={isLoading}
            support={support}
            setSupport={setSupport}
            confidence={confidence}
            setConfidence={setConfidence}
            uniqueItems={uniqueItems}
            transactionLength={transactionData.length}
          />
        )}
      </div>
    </>
  );
}
export default MainPage;
