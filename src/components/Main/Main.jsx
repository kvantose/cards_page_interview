import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./Main.css";

export default function Main() {
  const [picture, setPicture] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    document.title = "Gallery";
  })

  useEffect(() => {
    const fethData = async () => {
      await fetch("http://localhost:8000/photos")
        .then((response) => response.json())
        .then((data) => setPicture(data));
    };
    fethData();
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

  const handleNavigate = (item) => {
    item.views++
    fetch(`http://localhost:8000/setView/${item.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        views: item.views,
      }),
    })
    navigate("/photo/:id", { state: item.id });
  }

  return (
    <>
      <div className="main">
        {Array.isArray(picture) &&
          picture
            .sort((a, b) => b.id - a.id)
            .map((item, index) => (
              <>
                <div key={item.id} className="main">
                  <div className="card">
                    <div className="overlay">
                      <img
                        src={item.img}
                        alt="img"
                        className="img"
                        onClick={() => handleNavigate(item)}
                      />
                    </div>
                    <div className="info">
                      <button className="btn-like" onClick={() => handleClick(item)}>
                        <FavoriteIcon
                          fontSize="large"
                          color={item.liked === true ? "error" : "inherit"}
                        />
                        <p>{item.likes}</p>
                      </button>
                      <button className="btn-views">
                        <RemoveRedEyeIcon fontSize="large" />
                        <p>{item.views}</p>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
      </div>
    </>
  );
}
