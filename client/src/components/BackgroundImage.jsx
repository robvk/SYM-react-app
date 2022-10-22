// React
import React from "react";
// Style
import style from "./BackgroundImage.module.css";
import bgImage from "../assets/images/background-image.jpg";

const BackgroundImage = () => {
  return (
    <div>
      <div className={style.bgImageContainer}>
        <img src={bgImage} className={style.bgImage} />
      </div>
    </div>
  );
};

export default BackgroundImage;
