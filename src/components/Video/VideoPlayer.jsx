import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoPlayer = React.forwardRef((props, ref) => {
  const { id } = useParams();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Ошибка: ID лекции не найден.");
      setLoading(false);
      return;
    }

    const fetchLectureDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Ошибка: Необходим токен для доступа.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/lectures/${id}/details`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setSelectedLecture(response.data);
      } catch (err) {
        console.error("Ошибка загрузки лекции:", err);
        setError("Не удалось загрузить данные лекции.");
      } finally {
        setLoading(false);
      }
    };

    fetchLectureDetails();
  }, [id]);

  if (loading) return <p>Pobieranie wideo....</p>;
  if (error) return <p>{error}</p>;
  if (!selectedLecture) return <p>Nie znaleziono wykładu.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>{selectedLecture.title}</h1>
      {selectedLecture.videoUrl ? (
        <video ref={ref} {...props} style={{ width: "50%", display: "block" }} controls>
          <source
            src={`https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me${selectedLecture.videoUrl}`}
            type="video/mp4"
          />
          Twoja przeglądarka nie obsługuje wideo.
        </video>
      ) : (
        <p>Nie przesłano żadnego materiału wideo.</p>
      )}
    </div>
  );
});

export default VideoPlayer;
