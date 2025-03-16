import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function NavigationButtons({ videoId, isVideoCompleted, onNext }) {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const getBlockId = (videoId) => {
    if (videoId >= 10 && videoId <= 19) return 1;
    if (videoId >= 20 && videoId <= 29) return 2;
    if (videoId >= 30 && videoId <= 39) return 3;
    if (videoId >= 40 && videoId <= 49) return 4;
    if (videoId >= 60 && videoId <= 69) return 5;
    if ([51, 52, 53, 54, 55].includes(videoId)) return "test";
    return 1;
  };

  const blockId = getBlockId(videoId);

  const nextVideoId = parseInt(id, 10);
  if (isNaN(nextVideoId)) {
    console.error("Неверный ID видео:", id);
  }

  const handleNextClick = () => {
    navigate(`/video/${nextVideoId + 1}`);
    window.location.reload();
  };

  // return (
  //   <div className="buttons-video">
  //     <Link to={`/lectures/user/${id}/block/${blockId}`} className="back-button1">
  //       Wrócić
  //     </Link>
  //     <button
  //       className="next-button-video"
  //       onClick={handleNextClick}
  //       // disabled={!isVideoCompleted} // потом нужно будет подлчюить isVideoCompleted  TODO
  //     >
  //       Dalej
  //     </button>
  //   </div>
  // );
}

export default NavigationButtons;
