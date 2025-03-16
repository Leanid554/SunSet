import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const UploadVideo = ({ lectureId }) => {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video) {
      alert("Wybierz wideo do pobrania.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    setUploading(true);

    try {
      await axios.post(
        `${API_BASE_URL}/lectures/${lectureId}/upload-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Wideo przesłane pomyślnie!");
    } catch {
      alert("Błąd podczas przesyłania wideo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Ładowanie..." : "Przesyłanie wideo"}
      </button>
    </div>
  );
};

export default UploadVideo;
