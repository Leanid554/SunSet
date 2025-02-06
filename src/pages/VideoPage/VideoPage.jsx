import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './index.scss';

function VideoPage() {
  const { id } = useParams();

  // Логика для определения блока в зависимости от ID видео
  let blockId = null;

  // Определяем, к какому блоку относится видео
  if (id >= 10 && id <= 19) {
    blockId = 1; // Блок 1
  } else if (id >= 20 && id <= 29) {
    blockId = 2; // Блок 2
  } else if (id >= 30 && id <= 39) {
    blockId = 3; // Блок 3
  } else if (id >= 40 && id <= 49) {
    blockId = 4; // Блок 4
  } else if ([51, 52, 53, 54].includes(Number(id))) {
    blockId = 'test'; // Тесты
  }

  return (
    <div className="video-page">
      <video width="600" controls>
        <source src={`/videos/video${id}.mp4`} type="video/mp4" />
        <p>Ваш браузер не поддерживает воспроизведение видео.</p>
      </video>

      {/* Кнопка "Назад", которая ведет на правильную страницу */}
      {blockId === 'test' ? (
        // Для тестов возвращаем на страницу тестов
        <Link to={`/test/${id}`} className="back-button1">
          Назад
        </Link>
      ) : (
        // Для блоков 1-4 возвращаем на страницу соответствующего блока
        <Link to={`/block/${blockId}`} className="back-button1">
          Назад
        </Link>
      )}
    </div>
  );
}

export default VideoPage;
