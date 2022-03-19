import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducer/login/index";
import moment from "moment";
import "./Categories.css";
const Categories = ({isCategory,setIsCategory}) => {
  const navigate = useNavigate();
  console.log(isCategory);
  return (
    <div className="categories">
      <section className="category-section">
        <button className="category active">All</button>
        <button className="category" onClick={() =>{
         
          navigate(`/categories/Educational Videos`)
          setIsCategory(!isCategory)
        }}>Educational Videos</button>
        <button className="category" onClick={() =>{
          
          navigate(`/categories/Unboxing Videos`)
          setIsCategory(!isCategory)
        }}>Unboxing Videos</button>
        <button className="category" onClick={() =>{
          navigate(`/categories/Learning Videos`)
          setIsCategory(!isCategory)
        }}>Learning Videos</button>
        <button className="category" onClick={() =>{
          navigate(`/categories/Actions Films`)
          setIsCategory(!isCategory)
        }}>Actions Films</button>
        <button className="category" onClick={() =>{
          navigate(`/categories/Trailers`)
          setIsCategory(!isCategory)
        }}>Trailers</button>
        <button className="category" onClick={() =>{
          navigate(`/categories/Challenge Video`)
          setIsCategory(!isCategory)
        }}>Challenge Video</button>
        <button className="category" onClick={() =>{
          navigate(`/categories/Product Demo`)
          setIsCategory(!isCategory)
        }}>Product Demo</button>
        <button className="category" onClick={() =>{
          navigate(`/categories/Reaction Videos`)
          setIsCategory(!isCategory)
        }}>Reaction Videos</button>
        <button className="category" onClick={() =>{
          navigate(`/categories/Video Blogs`)
          setIsCategory(!isCategory)
        }}>Video Blogs</button>
      </section>
    </div>
  );
};

export default Categories;
