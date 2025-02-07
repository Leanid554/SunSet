import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './index.scss';

function VideoPage() {
  const { id } = useParams();
  const videoId = Number(id);
  const navigate = useNavigate();

  let blockId = null;
  let lessonTitle = `Lekcja ${videoId % 10}`;

  if (videoId >= 10 && videoId <= 19) {
    blockId = 1;
  } else if (videoId >= 20 && videoId <= 29) {
    blockId = 2;
  } else if (videoId >= 30 && videoId <= 39) {
    blockId = 3;
  } else if (videoId >= 40 && videoId <= 49) {
    blockId = 4;
  } else if ([51, 52, 53, 54].includes(videoId)) {
    blockId = 'test';
    lessonTitle = `Test ${videoId - 50}`;
  }

  useEffect(() => {
  }, [id]);

  const goToNextLesson = () => {
    const nextVideoId = videoId + 1;
    let nextBlockVideoId = nextVideoId;

    if (blockId === 1 && nextVideoId <= 19) {
      nextBlockVideoId = nextVideoId;
    } else if (blockId === 2 && nextVideoId <= 29) {
      nextBlockVideoId = nextVideoId;
    } else if (blockId === 3 && nextVideoId <= 39) {
      nextBlockVideoId = nextVideoId;
    } else if (blockId === 4 && nextVideoId <= 49) {
      nextBlockVideoId = nextVideoId;
    } else {
      return; 
    }

    navigate(`/video/${nextBlockVideoId}`);
  };

  return (
    <div className="video-page">
      <h3>{lessonTitle}</h3>
      <video key={id} width="600" controls>
        <source src={`/videos/video${id}.mp4`} type="video/mp4" />
        <p>Twoja przeglądarka nie obsługuje odtwarzania wideo.</p>
      </video>


    <div className='buttons-video'>
      {blockId === 'test' ? (
        <Link to={`/test/${id}`} className="back-button1">
          Wrócić
        </Link>
      ) : (
        <Link to={`/block/${blockId}`} className="back-button1">
          Wrócić
        </Link>
      )}

      <button className='next-button-video' onClick={goToNextLesson}>
        Dalej
      </button>
    </div>
    </div>
  );
}

export default VideoPage;
