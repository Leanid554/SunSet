import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const WebSocket = () => {
  const [status, setStatus] = useState("Connecting...");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const socket = io(
      "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/",
      {
        query: { userId },
      }
    );

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
