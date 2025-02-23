import React from "react";
import { Link } from "react-router-dom";

function NavigationButtons({ videoId, isVideoCompleted, onNext }) {
  return (
    <div className="buttons-video">
      <Link to={`/block/${videoId}`} className="back-button1">Wrócić</Link>
      <button
        className="next-button-video"
        onClick={onNext}
        disabled={!isVideoCompleted}
      >
        Dalej
      </button>
    </div>
  );
}

export default NavigationButtons;
