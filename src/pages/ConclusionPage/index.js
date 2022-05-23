import ConditionalLoading from "../../components/ConditionalLoading";
import { colorMapGenerator } from "../../Services/etc";
import ConfidenceSlider from "../../components/Sliders/ConfidenceSlider";
import SupportSlider from "../../components/Sliders/SupportSlider";
import "./index.css";
import NoData from "../../components/NoData";

export default function ConclusionPage(props) {
  return (
    <div className="container">
      <div className="combinedSlider">
        <SupportSlider
          support={props.support}
          setSupport={props.setSupport}
          transactionLength={props.transactionLength}
        />
        <ConfidenceSlider
          confidence={props.confidence}
          setConfidence={props.setConfidence}
        />
      </div>
      <ConditionalLoading isLoading={props.isLoading}>
        <div className="tablesWrapper">
          {props.liftSets.some((liftSet) => liftSet.length > 0) ? (
            props.liftSets.map(
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
                                    backgroundColor: colorMapGenerator(
                                      set.lift
                                    ),
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
            )
          ) : (
            <NoData />
          )}
        </div>
      </ConditionalLoading>
    </div>
  );
}
