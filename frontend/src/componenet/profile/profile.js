import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

toast.configure();
const Profile = () => {
  const [userProfile, setuserProfile] = useState([]);

  const [profileVideos, setprofileVideos] = useState([]);
  const [isDeleted, setisDeleted] = useState(false);
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const decode = state.token && jwt_decode(state.token);
  let user_id = decode && decode.userId;

  const getUserById = () => {
    axios
      .get(`http://localhost:5000/user/profile`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        setuserProfile(response.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const getAllVideosBuChannelId = () => {
    axios
      .get(`http://localhost:5000/video/${user_id}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        setprofileVideos(response.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const deleteAnVideoById = (id) => {
    axios
      .delete(`http://localhost:5000/video/delete_1/${id}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    getAllVideosBuChannelId();
  }, [isDeleted]);

  const profileDetails =
    userProfile &&
    userProfile.map((profile) => {
      <div className="profile-main">
        <div className="profile-div-container">
          <div className="container-above-div">
            <div className="image-name">
              <img src={profile.user_image} />
              <span>{profile.firstName}</span>
              <span>{profile.lastName}</span>
            </div>
            <div className="videos-profile">
              <button className="all-videos"> My Videos</button>
              <button className="all-videos">Delete Profile</button>
            </div>
          </div>
          <div className="home-videos-playList">
            <div>home</div>
            <div>Videos</div>
            <div>Channels</div>
            <div>About</div>
          </div>
        </div>

        <div className="profile-upload-videos">
          <div className="profile-upload-image">
            <img src="https://www.gstatic.com/youtube/img/channels/empty_channel_illustration.svg" />
          </div>
          <div>
            <p>Upload a video to get started</p>
            <p>
              Start sharing your story and connecting with viewers. Videos you
              upload will show up here.
            </p>
            <button className="uplaod-button">Create New Video</button>
          </div>
        </div>
      </div>;
    });

  return <>{profileDetails ? profileDetails : null}</>;
};

export default Profile;
