import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useEffect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const updateAnVideoById = ()=>{

let {id} = useParams()

const getVideoById = ()=>{
    axios.get(`http://localhost:5000/video/search_1?id=${id}`,{
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      }).then((response)=>{

      }).catch((error)=>{
          
      })
}

}