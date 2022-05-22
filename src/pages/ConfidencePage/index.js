import ConditionalLoading from "../../components/ConditionalLoading";

function ConfidencePage(props) {
  return (
    <div className="container">
      <div className="sliderWrapper">
        <input
          type="range"
          min="10"
          max="100"
          value={props.confidence}
          className="slider"
          id="myRange"
          onChange={(e) => props.setConfidence(e.target.value)}
        />
        <p>Min Confidence: {props.confidence}%</p>
      </div>
      <ConditionalLoading isLoading={props.isLoading}>
        <div className="tablesWrapper">
          {props.confidenceSets.map(
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
          )}
        </div>
      </ConditionalLoading>
    </div>
  );
}
export default ConfidencePage;
