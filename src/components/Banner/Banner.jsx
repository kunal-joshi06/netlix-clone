import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../api/axios";
import requests from "../../api/request";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.orginal_name}
        </h1>
        <div className="banner-btns">
          <button className="banner-btn">Play</button>
          <button className="banner-btn">My List</button>
        </div>
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
