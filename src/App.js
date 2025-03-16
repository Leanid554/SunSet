import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementVisit } from "./store/visitsSlice";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  const visits = useSelector((state) => state.visits.count);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(incrementVisit());
  }, [dispatch]);

  return (
    <>
      <Navbar count={visits} />
      <LoginPage />
    </>
  );
}

export default App;
