import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementVisit } from "./store/visitsSlice";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";

function App() {
  const visits = useSelector((state) => state.visits.count);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(incrementVisit());
  }, [dispatch]);

  return (
    <>
      <Navbar count={visits} />
      <Login />
    </>
  );
}

export default App;
