import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Cloudinar.css";

const Cloudinary = ({ setImage }) => {
  const [file, setFile] = useState();
  const [filelink, setFilelink] = useState("Choose File");
  const imageUpload = (imageFile) => {
    console.log("ksjckjn");
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "y3fujtpr");
    data.append("cloud_name", "the-debuggers");

    axios
      .post(`https://api.cloudinary.com/v1_1/the-debuggers/image/upload`, data)
      .then((res) => {
        setFilelink(res.data.secure_url);
        setImage(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="upload">
      <input
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
        type="file"
      ></input>
      <button
        className="btn"
        onClick={() => {
          imageUpload(file);
        }}
      >
        Upload
      </button>
    </div>
  );
};
export default Cloudinary;
