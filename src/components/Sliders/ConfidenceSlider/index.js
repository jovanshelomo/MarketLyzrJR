import "../index.css";

export default function ConfidenceSlider(props) {
  return (
    <div className="sliderWrapper">
      <input
        type="range"
        min="1"
        max="100"
        step="0.1"
        value={props.confidence}
        className="slider"
        onChange={(e) => props.setConfidence(e.target.value)}
      />
      <p>Min Confidence: {props.confidence}%</p>
    </div>
  );
}
