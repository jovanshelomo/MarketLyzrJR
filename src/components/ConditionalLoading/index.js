import "./index.css";

export default function ConditionalLoading(props) {
  return props.isLoading ? (
    <div className="blockContainer loadingBlock">
      <div className="loader"></div>
      <p style={{ position: "relative", top: "60%" }}>loading...</p>
    </div>
  ) : (
    props.children
  );
}
