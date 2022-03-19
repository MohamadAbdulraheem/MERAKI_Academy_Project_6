import React, { useState, useEffect } from "react";
import { Routes, Route, Link,useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducer/login/index";
import Categories from "../Categories/Categories";
import moment from "moment";

const AllCategories = ({isCategory,setIsCategory}) => {
  const navigate = useNavigate();
  const [allVideos, setallVideos] = useState([]);
  let { category } = useParams();

  const getAllVideosByCategories = () => {
    axios
      .get(`/video/search_2?category=${category}`)
      .then((response) => {
        setallVideos(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllVideosByCategories();
  }, [isCategory]);

  return (
    <div className="videos">
       <Categories setIsCategory={setIsCategory} />
      <h1>Results filter for {category} </h1>
      <div className="videos__container">
        {allVideos &&
          allVideos.map((video) => {
            return (
              <div
                className="video"
                onClick={() => {
                  navigate(`/video/${video.id}`);
                }}
              >
                <div className="video__thumbnail">
                  <img src={video.image} alt="" />
                </div>
                <div className="video__details">
                  <div className="author">
                    <img src={video.user_image} alt="" />
                  </div>
                  <div className="title">
                    <h3>{video.title}</h3>
                    <Link to="">{`${video.firstName}  ${video.lastName}`}</Link>
                    <span>
                      {video.video_views} •{" "}
                      {moment(video.publish_date).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllCategories;
