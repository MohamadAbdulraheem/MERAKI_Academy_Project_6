import "./sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Sidebar = ({ sideClick }) => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  //// create state to save the user information

  const [user, setUser] = useState([]);

  const getUserById = () => {
    axios
      .get(`http://localhost:5000/user/profile`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        setUser(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    // <div classNameName="main-sidebar">
    //   <div className={sideClick ? "show-sidebar" : "sidebar"}>
    //     <div className="sidebar__categories">
    //       <div className="sidebar__category">
    //         <i className="material-icons">home</i>
    //         <span>Home</span>
    //       </div>
    //       <div className="sidebar__category">
    //         <i className="material-icons">local_fire_department</i>
    //         <span>Trending</span>
    //       </div>
    //       <div className="sidebar__category">
    //         <i className="material-icons">subscriptions</i>
    //         <span>Subcriptions</span>
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="sidebar__categories">
    //       <div className="sidebar__category">
    //         <i className="material-icons">library_add_check</i>
    //         <span>Library</span>
    //       </div>
    //       <div className="sidebar__category">
    //         <i className="material-icons">history</i>
    //         <span>History</span>
    //       </div>
    //       <div className="sidebar__category">
    //         <i className="material-icons">play_arrow</i>
    //         <span>Your Videos</span>
    //       </div>
    //       <div className="sidebar__category">
    //         <i className="material-icons">watch_later</i>
    //         <span>Watch Later</span>
    //       </div>
    //       <div className="sidebar__category">
    //         <i className="material-icons">thumb_up</i>
    //         <span>Liked Videos</span>
    //       </div>
    //     </div>
    //     <hr />
    //   </div>
    // </div>
    ////////////////////////////////////////////////////////////////////////////////////////////actual
    <aside className={sideClick ? "sidebar open" : "sidebar"}>
      {user &&
        user.map((user) => {
          return (
            <div className="top-sidebar">
              <Link to="#" className="channel-logo">
                <img src={user.user_image} alt="" />
              </Link>
              <div className="hidden-sidebar your-channel">Your channel</div>
              <div className="hidden-sidebar channel-name">
                {user.firstName + user.lastName}
              </div>
            </div>
          );
        })}
      <div className="middle-sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-list-item active">
            <Link to="#" className="sidebar-link">
              <svg
                className="sidebar-icon"
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Dashboard</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="#" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                className="sidebar-icon"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Content</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/mySubscription" className="sidebar-link">
              <svg
                className="sidebar-icon"
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Subscriptions</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/likedVideos" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Liked Videos</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/watchLater" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Watch Later</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="#" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Subtitles</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="#" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Copyright</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="#" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Monetization</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="#" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Customization</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="#" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Audio Library</div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bottom-sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Link to="#" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Settings</div>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="#" className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="sidebar-icon"
              >
                <g>
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path>
                </g>
              </svg>
              <div className="hidden-sidebar">Send Feedback</div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
