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
  } else if (id === 51 || id === 52) {
    blockId = 'test'; // Тесты
  }

  return (
    <div className="video-page">
      <video width="600" controls>
        <source src={`/videos/video${id}.mp4`} type="video/mp4" />
        <p>Ваш браузер не поддерживает воспроизведение видео.</p>
      </video>

      {/* Кнопка "Назад", которая ведет на страницу правильного блока */}
      {blockId === 'test' ? (
        // Для тестов мы возвращаем на страницу тестов
        <Link to={`/test/${id}`} className="back-button1">
          Назад
        </Link>
      ) : (
        // Для блоков 1 и 2 мы возвращаем на страницу соответствующего блока
        <Link to={`/block/${blockId}`} className="back-button1">
          Назад
        </Link>
      )}
    </div>
  );
}

export default VideoPage;
