import ConditionalLoading from "../../components/ConditionalLoading";

function SupportPage(props) {
  return (
    <div className="container">
      <div className="sliderWrapper">
        <input
          type="range"
          min="1"
          max="100"
          value={props.support}
          className="slider"
          id="myRange"
          onChange={(e) => props.setSupport(e.target.value)}
        />
        <p>
          Min Support: {props.support}% (
          {Math.ceil((props.support * props.transactionData.length) / 100)})
        </p>
      </div>
      <ConditionalLoading isLoading={props.isLoading}>
        <div className="tablesWrapper">
          {props.supportSets.map(
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
          )}
        </div>
      </ConditionalLoading>
    </div>
  );
}
export default SupportPage;
