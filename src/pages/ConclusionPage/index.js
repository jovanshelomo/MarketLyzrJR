import ConditionalLoading from "../../components/ConditionalLoading";
import { colorMapGenerator } from "../../Services/etc";

export default function ConclusionPage(props) {
  return (
    <div className="container">
      <div className="combinedSlider">
        <div className="sliderWrapper">
          <input
            type="range"
            min="30"
            max="100"
            value={props.support}
            className="slider"
            id="myRange"
            onChange={(e) => props.setSupport(e.target.value)}
          />
          <p>
            Min Support: {props.support}% (
            {Math.ceil((props.support * props.uniqueItems.length) / 100)})
          </p>
        </div>
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
      </div>
      <ConditionalLoading isLoading={props.isLoading}>
        <div className="tablesWrapper">
          {props.liftSets.map(
            (liftSet, index) =>
              liftSet.length > 0 && (
                <div className="tableWrapper" key={index}>
                  <table className="listTable">
                    <thead>
                      <tr>
                        <th colSpan={2}>{index + 2}-frequent itemset</th>
                      </tr>
                      <tr>
                        <th>Item</th>
                        <th>Lift</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liftSet.map((set, index2) => (
                        <tr key={index + "" + index2}>
                          <td>
                            [{set.items[0].join(", ")}]&lt;=&gt;[
                            {set.items[1].join(", ")}]
                          </td>
                          <td
                            style={{
                              color: colorMapGenerator(set.lift),
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div className="liftNumber">
                              {set.lift.toFixed(2)}
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  backgroundColor: colorMapGenerator(set.lift),
                                  borderRadius: "100px",
                                }}
                              ></div>
                            </div>
                          </td>
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
