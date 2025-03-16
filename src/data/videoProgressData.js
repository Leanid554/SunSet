// // src/data/videoProgressData.js
// const videoProgressData = {
//   1: [
//     { id: 11, progress: 100 },
//     { id: 12, progress: 100 },
//     { id: 13, progress: 100 },
//     { id: 14, progress: 100 },
//     { id: 15, progress: 100 },
//     { id: 16, progress: 100 },
//     { id: 17, progress: 100 },
//     { id: 18, progress: 100 },
//     { id: 19, progress: 0 },
//     { id: 51, progress: 0 },
//   ],
//   2: [
//     { id: 21, progress: 100 },
//     { id: 22, progress: 100 },
//     { id: 23, progress: 100 },
//     { id: 24, progress: 100 },
//     { id: 25, progress: 50 },
//     { id: 26, progress: 0 },
//     { id: 27, progress: 0 },
//     { id: 28, progress: 0 },
//     { id: 29, progress: 0 },
//     { id: 52, progress: 0 },
//   ],
//   3: [
//     { id: 31, progress: 100 },
//     { id: 32, progress: 100 },
//     { id: 33, progress: 100 },
//     { id: 34, progress: 100 },
//     { id: 35, progress: 50 },
//     { id: 36, progress: 0 },
//     { id: 37, progress: 0 },
//     { id: 38, progress: 0 },
//     { id: 39, progress: 0 },
//     { id: 53, progress: 0 },
//   ],
//   4: [
//     { id: 41, progress: 100 },
//     { id: 42, progress: 100 },
//     { id: 43, progress: 100 },
//     { id: 44, progress: 100 },
//     { id: 45, progress: 50 },
//     { id: 46, progress: 0 },
//     { id: 47, progress: 0 },
//     { id: 48, progress: 0 },
//     { id: 49, progress: 0 },
//     { id: 54, progress: 0 },
//   ],
// };

// // Функция для обновления прогресса
// export const updateProgress = (blockId, videoId, newProgress) => {
//   if (videoProgressData[blockId]) {
//     const video = videoProgressData[blockId].find((video) => video.id === videoId);
//     if (video) {
//       video.progress = newProgress;
//     }
//   }
// };

// // Экспортируем данные
// export default videoProgressData;
