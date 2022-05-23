import ConditionalLoading from "../../components/ConditionalLoading";
import NoData from "../../components/NoData";
import ConfidenceSlider from "../../components/Sliders/ConfidenceSlider";

function ConfidencePage(props) {
  return (
    <div className="container">
      <ConfidenceSlider
        confidence={props.confidence}
        setConfidence={props.setConfidence}
      />
      <ConditionalLoading isLoading={props.isLoading}>
        <div className="tablesWrapper">
          {props.confidenceSets.some(
            (confidenceSet) => confidenceSet.length > 0
          ) ? (
            props.confidenceSets.map(
              (confidenceSet, index) =>
                confidenceSet.length > 0 && (
                  <div className="tableWrapper" key={index}>
                    <table className="listTable">
                      <thead>
                        <tr>
                          <th colSpan={2}>{index + 2}-frequent itemset</th>
                        </tr>
                        <tr>
                          <th>Item</th>
                          <th>Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {confidenceSet.map((set, index2) => (
                          <tr key={index + "" + index2}>
                            <td>
                              {set.antecedent.join(", ")} =&gt;{" "}
                              {set.consequent.join(", ")}
                            </td>
                            <td>{set.confidence.toFixed(2)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
            )
          ) : (
            <NoData />
          )}
        </div>
      </ConditionalLoading>
    </div>
  );
}
export default ConfidencePage;
