// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Style
import style from "./BackgroundImage.module.css";
import bgImage from "../assets/images/background-image.jpg";

const BackgroundImage = (props) => {
  const [bg, setBg] = useState();

  useEffect(() => {
    props.space ? setBg(style.bgSpace) : setBg(style.bgImageContainer);
  }, []);
  return (
    <div>
      <div className={bg}>
        <img src={bgImage} className={style.bgImage} />
      </div>
    </div>
  );
};

BackgroundImage.propTypes = {
  space: PropTypes.bool,
};

export default BackgroundImage;
