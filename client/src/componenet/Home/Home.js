import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Categories from "../Categories/Categories";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
const menuIcon = document.querySelector(".logo");
const Home = ({ setChanelId,setIsCategory,isCategory }) => {
  //Navigate initialization
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  //create state for all videos
  const [allVideos, setAllVideos] = useState([]);

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
console.log(typeof setIsCategory );
  const getVideoBySubscriptios = () => {
    axios
      .get(`/subscription/videos`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        setVideos(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllVideos = () => {
    axios
      .get(`/video/all`)
      .then((response) => {
        setAllVideos(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllVideos();
  }, []);
  useEffect(() => {
    getVideoBySubscriptios();
  }, []);

  return (
    <div className="videos">
      <Categories isCategory={isCategory} setIsCategory={setIsCategory} />
     {videos&&videos.length? <h1>Recommended</h1>:null}

      {videos&&videos.length?<div className="videos__container border-botom">
        {videos &&
          videos.map((video) => {
            return (
              <div
                className="video"
                onClick={() => {
                  navigate(`/video/${video.id}`);
                  setChanelId(video.id);
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
                      {video.video_views} Views •{" "}
                      {moment(video.publish_date).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>:null}
      <h1 className="padding-top">All videos</h1>
      <div className="videos__container">
        {allVideos &&
          allVideos.map((video) => {
            return (
              <div
                className="video"
                onClick={() => {
                  navigate(`/video/${video.id}`);
                  setChanelId(video.id);
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
                      {video.video_views} Views •{" "}
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

export default Home;
