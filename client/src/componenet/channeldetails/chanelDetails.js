import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducer/login/index";
import moment from "moment";
toast.configure();

const ChannelDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  ///// this state to save the videos for this user
  const [channelVideos, setchannelVideos] = useState([]);
  /// this state to save the information for the user
  const [channelDetails, setchannelDetails] = useState([]);

  const getChannelById = () => {
    axios
      .get(`/user/channelDetails/${id}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        setchannelDetails(response.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const getAllVideosBuChannelId = () => {
    axios
      .get(`/video/${id}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        setchannelVideos(response.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    getChannelById();
  }, []);

  useEffect(() => {
    getAllVideosBuChannelId();
  }, []);

  const profileDetails =
    channelDetails &&
    channelDetails.map((profile) => {
      return (
        <div className="profile-main">
          <div className="profile-div-container">
            <div className="container-above-div">
              <div className="image-name">
                <img src={profile.user_image} />
                <span className="home-videos-playList3">{profile.firstName} {profile.lastName}  </span>
                  
             
              
                 
               
              </div>
              {/* <div className="videos-profile">
              <button
                className="all-videos"
                onClick={() => {
                  setmyVideos(false);
                }}
              >
                {" "}
                My Videos
              </button>
              <button
                className="all-videos"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back To Home
              </button>
            </div> */}
            </div>
            {/* <div className="home-videos-playList">
            <div
              className="home-videos-playList2"
              onClick={() => {
                setmyVideos(true);
              }}
            >
              Home
            </div>
            <div
              className="home-videos-playList2"
              onClick={() => {
                setmyVideos(false);
              }}
            >
              Videos
            </div>
            <div className="home-videos-playList2">Channels</div>
            <div className="home-videos-playList2">About</div>
          </div> */}
          </div>
          {/*  */}
          <div className="videos">
            <div className="videos__container">
              {channelVideos &&
                channelVideos.map((video) => {
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
        </div>
      );
    });
  return <>{profileDetails ? profileDetails : null}</>;
};

export default ChannelDetails;
