// Данные о видео (прогресс)
const videosData = {
  1: [
    { id: 11, title: "Lekcja1", progress: 100 },
    { id: 12, title: "Lekcja2", progress: 100 },
    { id: 13, title: "Lekcja3", progress: 100 },
    { id: 14, title: "Lekcja4", progress: 100 },
    { id: 15, title: "Lekcja5", progress: 100 },
    { id: 16, title: "Lekcja6", progress: 100 },
    { id: 17, title: "Lekcja7", progress: 100 },
    { id: 18, title: "Lekcja8", progress: 100 },
    { id: 19, title: "Lekcja9", progress: 100 },
    { id: 51, title: "Test 1", progress: 100 },
  ],
  2: [
    { id: 21, title: "Lekcja1", progress: 100 },
    { id: 22, title: "Lekcja2", progress: 100 },
    { id: 23, title: "Lekcja3", progress: 100 },
    { id: 24, title: "Lekcja4", progress: 100 },
    { id: 25, title: "Lekcja5", progress: 100 },
    { id: 26, title: "Lekcja6", progress: 100 },
    { id: 27, title: "Lekcja7", progress: 100 },
    { id: 28, title: "Lekcja8", progress: 100 },
    { id: 29, title: "Lekcja9", progress: 100 },
    { id: 52, title: "Test 2", progress: 0 },
  ],
  3: [
    { id: 31, title: "Lekcja1", progress: 100 },
    { id: 32, title: "Lekcja2", progress: 100 },
    { id: 33, title: "Lekcja3", progress: 100 },
    { id: 34, title: "Lekcja4", progress: 100 },
    { id: 35, title: "Lekcja5", progress: 50 },
    { id: 36, title: "Lekcja6", progress: 0 },
    { id: 37, title: "Lekcja7", progress: 0 },
    { id: 38, title: "Lekcja8", progress: 0 },
    { id: 39, title: "Lekcja9", progress: 0 },
    { id: 53, title: "Test 3", progress: 0 },
  ],
  4: [
    { id: 41, title: "Lekcja1", progress: 100 },
    { id: 42, title: "Lekcja2", progress: 100 },
    { id: 43, title: "Lekcja3", progress: 100 },
    { id: 44, title: "Lekcja4", progress: 100 },
    { id: 45, title: "Lekcja5", progress: 0 },
    { id: 46, title: "Lekcja6", progress: 0 },
    { id: 47, title: "Lekcja7", progress: 0 },
    { id: 48, title: "Lekcja8", progress: 0 },
    { id: 49, title: "Lekcja9", progress: 0 },
    { id: 54, title: "Test 4", progress: 0 },
  ],
  5: [
    { id: 61, title: "Lekcja1", progress: 100 },
    { id: 62, title: "Lekcja2", progress: 100 },
    { id: 63, title: "Lekcja3", progress: 100 },
    { id: 64, title: "Lekcja4", progress: 100 },
    { id: 65, title: "Lekcja5", progress: 100 },
    { id: 66, title: "Lekcja6", progress: 0 },
    { id: 67, title: "Lekcja7", progress: 0 },
    { id: 68, title: "Lekcja8", progress: 0 },
    { id: 69, title: "Lekcja9", progress: 0 },
    { id: 55, title: "Test 5", progress: 0 },
  ],
};

// 🔹 Хранилище результатов тестов (для каждого пользователя)
const userResults = {};

/**
 * ✅ Функция для обновления прогресса видео
 */
export const updateProgress = (blockId, videoId, newProgress) => {
  if (videosData[blockId]) {
    const video = videosData[blockId].find((video) => video.id === videoId);
    if (video) {
      video.progress = newProgress;
    }
  }
};

/**
 * ✅ Функция для сохранения результатов теста
 * @param {string} userId - ID пользователя
 * @param {number} testId - ID теста
 * @param {number} score - Балл за тест (0-100)
 */
export const saveTestResult = (userId, testId, score) => {
  if (!userResults[userId]) {
    userResults[userId] = {}; // Создаем объект для нового пользователя
  }
  userResults[userId][testId] = score; // Записываем результат теста
};

/**
 * ✅ Функция для получения результатов теста пользователя
 * @param {string} userId - ID пользователя
 * @returns {object} - Объект с результатами тестов
 */
export const getUserResults = (userId) => {
  return userResults[userId] || {}; // Возвращаем результаты или пустой объект
};

// Экспортируем данные и функции
export { userResults };
export default videosData;
