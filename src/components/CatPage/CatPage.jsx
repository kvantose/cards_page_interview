import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./CatPage.css";

export default function CatPage() {
  const [photo, setPhoto] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    document.title = `Cat ${location.state}`
  })

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:8000/photo/${location.state}`)
        .then((response) => response.json())
        .then((data) => setPhoto(data));
    };
    fetchData();
  });

  const handleClick = (item) => {
    if (item.liked === false) {
      item.likes++;
    } else {
      item.likes--;
    }

    fetch(`http://localhost:8000/setLike/${item.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: item.likes,
        views: item.views,
        liked: item.liked === true ? false : true,
      }),
    });
  };

  return (
    <>
      <button className="btn-back" onClick={() => navigate("/")}>
        <ArrowBackIosIcon />
        Back
      </button>
      {Array.isArray(photo) &&
        photo.map((photo) => (
          <div key={photo.id} className="photo-cat">
            <img
              src={photo.img}
              alt=""
              key={photo.id}
              width={500}
              height={600}
            />
            <div className="btn-like-views">
              <h1>Cat {photo.id}</h1>
              <button
                className="btn-like-page"
                onClick={() => handleClick(photo)}
              >
                <FavoriteIcon
                  fontSize="large"
                  color={photo.liked === true ? "error" : "inherit"}
                />
                <p>{photo.likes}</p>
              </button>
              <button className="btn-views-page">
                <RemoveRedEyeIcon fontSize="large" />
                <p>{photo.views}</p>
              </button>
            </div>
          </div>
        ))}
    </>
  );
}
