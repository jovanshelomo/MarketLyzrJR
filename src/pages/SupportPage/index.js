import ConditionalLoading from "../../components/ConditionalLoading";
import NoData from "../../components/NoData";
import SupportSlider from "../../components/Sliders/SupportSlider";

function SupportPage(props) {
  return (
    <div className="container">
      <SupportSlider
        support={props.support}
        setSupport={props.setSupport}
        transactionLength={props.transactionData.length}
      />
      <ConditionalLoading isLoading={props.isLoading}>
        <div className="tablesWrapper">
          {props.supportSets.some((supportSet) => supportSet.length > 0) ? (
            props.supportSets.map(
              (supportSet, index) =>
                supportSet.length > 0 && (
                  <div className="tableWrapper" key={index}>
                    <table className="listTable">
                      <thead>
                        <tr>
                          <th colSpan={2}>{index + 1}-frequent itemset</th>
                        </tr>
                        <tr>
                          <th>Item</th>
                          <th>Support</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supportSet.map((set, index2) => (
                          <tr key={index + "" + index2}>
                            <td>{set.items.join(", ")}</td>
                            <td>{set.support}</td>
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
export default SupportPage;
