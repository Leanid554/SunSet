import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const WebSocket = () => {
  const [status, setStatus] = useState("Connecting...");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const socket = io(`${API_BASE_URL}`, {
      query: { userId },
    });

    socket.on("connect", () => {
      setStatus("Connected");
      console.log("Socket.io connected");
    });

    socket.on("disconnect", () => {
      setStatus("Disconnected");
      console.log("Socket.io disconnected");
    });

    socket.on("connect_error", (error) => {
      setStatus("Error");
      console.error("Socket.io error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return <></>;
};

export default WebSocket;
