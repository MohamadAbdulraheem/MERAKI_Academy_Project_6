import "./App.css";
import Login from "./componenet/login/login";
import Header from "./componenet/header/Header.js";
import Home from "./componenet/Home/Home.js";
import Sidebar from "./componenet/SideBar/Sidebar";
import PlayVideo from "./componenet/PlayVideo/PlayVideo.js";
import React, { useState } from "react";
import UpdateAnVideoById from "./componenet/updateVideo/updateVideo.js";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./componenet/signup/signup";
import Profile from "./componenet/profile/profile.js";
import CreateVideo from "./componenet/CreateVideo/CreateVideo.js";
import LikedVideos from "./componenet/LikedVideos/LikedVideos";
import Subcriptions from "./componenet/subscriptions/subscriptions";
import WatchLater from "./componenet/watchLater/watchLater";
import ChannelDetails from "./componenet/channeldetails/chanelDetails";
import AllCategories from "./componenet/allCategories/AllCategories.js";
import NotFound from "./componenet/notfound/NotFound";
import Search from "./componenet/Search/Search.js";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const [sideClick, setSideClick] = useState(true);
  const menu = document.querySelector("#menu");

  const sidebar = document.querySelector(".sidebar");
  const [isCategory, setIsCategory] = useState(false)

  const showSide = function () {
    sidebar.classList.toggle("show-sidebar");

    //create state for search
  };
  const [rightSearch, setRightSearch] = useState(true)
  const [search, setSearch] = useState("");
  const [chanelId, setChanelId] = useState(0);
  console.log(isCategory);
  return (
    <div className="App">
      <Header
        setSideClick={setSideClick}
        sideClick={sideClick}
        setSearch={setSearch}
        search={search}
        setRightSearch={setRightSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="mainBody">
              <Sidebar sideClick={sideClick} />

              <Home setChanelId={setChanelId} setIsCategory={setIsCategory} isCategory={isCategory}  />
            </div>
          }
        />

        <Route
          path="/video/:id"
          element={
            state.token ? (
              <PlayVideo chanelId={chanelId} setChanelId={setChanelId} />
            ) : (
              <div class="admin">
                <img
                  src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
                  style={{ width: "40%", height: " 40%" }}
                />
              </div>
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<UpdateAnVideoById />} />

        <Route
          path="/profile"
          element={
            state.token ? (
              <Profile />
            ) : (
              <div class="admin">
                <img
                  src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
                  style={{ width: "40%", height: " 40%" }}
                />
              </div>
            )
          }
        />
        <Route
          path="/create"
          element={
            state.token ? (
              <CreateVideo />
            ) : (
              <div class="admin">
                <div>
                  <img
                    src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
                    style={{
                      width: "40%",
                      height: " 40%",
                      display: "flex",
                      flexdirection: "row",
                      alignItems: "center",
                    }}
                  />
                </div>
              </div>
            )
          }
        />

        <Route
          path="/likedVideos"
          element={
            state.token ? (
              <LikedVideos />
            ) : (
              <div class="admin">
                <img
                  src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
                  style={{ width: "40%", height: " 40%" }}
                />
              </div>
            )
          }
        />

        <Route path="/likedVideos" element={<LikedVideos />} />

        <Route path="/mySubscription" element={<Subcriptions />} />

        <Route
          path="/watchLater"
          element={
            <div className="mainBody">
              <Sidebar sideClick={sideClick} />

              <WatchLater />
            </div>
          }
        />
        <Route
          path="/search/:search"
          element={
            <div className="mainBody">
              <Sidebar sideClick={sideClick} />

              <Search rightSearch={rightSearch} setRightSearch={setRightSearch} />
            </div>
          }
        />
        <Route
          path="/channelDetails/:id"
          element={
            state.token ? (
              <ChannelDetails />
            ) : (
              <div class="admin">
                <img
                  src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
                  style={{ width: "40%", height: " 40%" }}
                />
              </div>
            )
          }
        />

        {/* <Route
          path="/categories/:category"
          element={
            state.token ? (
              <AllCategories />
            ) : (
              <div class="admin">
                <img
                  src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
                  style={{ width: "40%", height: " 40%" }}
                />
              </div>
            )
          }
        /> */}
        <Route
          path="/categories/:category"
          element={
            state.token ? (
              <div className="mainBody">
                <Sidebar sideClick={sideClick} />

                <AllCategories isCategory={isCategory} />
              </div>
            ) : (
              <div class="admin">
                <img
                  src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
                  style={{ width: "40%", height: " 40%" }}
                />
              </div>
            )
          }
        />
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
