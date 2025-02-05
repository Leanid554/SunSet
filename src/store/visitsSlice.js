import { createSlice } from "@reduxjs/toolkit";

// Загружаем сохранённое значение из localStorage
const initialState = {
  count: Number(localStorage.getItem("visitCount")) || 0,
};

const visitsSlice = createSlice({
  name: "visits",
  initialState,
  reducers: {
    incrementVisit: (state) => {
      state.count += 1;
      localStorage.setItem("visitCount", state.count); // Сохраняем в localStorage
    },
  },
});

export const { incrementVisit } = visitsSlice.actions;
export default visitsSlice.reducer;
