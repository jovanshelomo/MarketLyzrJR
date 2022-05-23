import "../index.css";

export default function SupportSlider(props) {
  return (
    <div className="sliderWrapper">
      <input
        type="range"
        min="1"
        max="100"
        step="0.1"
        value={props.support}
        className="slider"
        onChange={(e) => props.setSupport(e.target.value)}
      />
      <p>
        Min Support: {props.support}% (
        {Math.ceil((props.support * props.transactionLength) / 100)})
      </p>
    </div>
  );
}
