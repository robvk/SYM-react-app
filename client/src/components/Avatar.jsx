import React from "react";
import PropTypes from "prop-types";
import first from "../assets/avatars/01.svg";
import second from "../assets/avatars/02.svg";
import third from "../assets/avatars/03.svg";
import fourth from "../assets/avatars/04.svg";
import fifth from "../assets/avatars/05.svg";
import sixth from "../assets/avatars/06.svg";
import seventh from "../assets/avatars/07.svg";
import eighth from "../assets/avatars/08.svg";
import ninth from "../assets/avatars/09.svg";
import tenth from "../assets/avatars/10.svg";
import eleventh from "../assets/avatars/11.svg";
import twelfth from "../assets/avatars/12.svg";
import thirteenth from "../assets/avatars/13.svg";
import fourteenth from "../assets/avatars/14.svg";
import fifteenth from "../assets/avatars/15.svg";
import sixteenth from "../assets/avatars/16.svg";
import seventeenth from "../assets/avatars/17.svg";
import eighteenth from "../assets/avatars/18.svg";

const Avatar = (props) => {
  let src;
  switch (true) {
    case 0:
      src = first;
      break;
    case props.symScore === 1:
      src = second;
      break;
    case props.symScore > 1 && props.symScore < 10:
      src = third;
      break;
    case props.symScore >= 10 && props.symScore < 20:
      src = fourth;
      break;
    case props.symScore >= 20 && props.symScore < 40:
      src = fifth;
      break;
    case props.symScore >= 40 && props.symScore < 60:
      src = sixth;
      break;
    case props.symScore >= 60 && props.symScore < 80:
      src = seventh;
      break;
    case props.symScore >= 80 && props.symScore < 90:
      src = eighth;
      break;
    case props.symScore >= 90 && props.symScore < 110:
      src = ninth;
      break;
    case props.symScore >= 110 && props.symScore < 130:
      src = tenth;
      break;
    case props.symScore >= 130 && props.symScore < 150:
      src = eleventh;
      break;
    case props.symScore >= 150 && props.symScore < 170:
      src = twelfth;
      break;
    case props.symScore >= 170 && props.symScore < 190:
      src = thirteenth;
      break;
    case props.symScore >= 190 && props.symScore < 210:
      src = fourteenth;
      break;
    case props.symScore >= 210 && props.symScore < 230:
      src = fifteenth;
      break;
    case props.symScore >= 230 && props.symScore < 250:
      src = sixteenth;
      break;
    case props.symScore >= 250 && props.symScore < 300:
      src = seventeenth;
      break;
    case props.symScore >= 300:
      src = eighteenth;
      break;
    default:
      src = first;
  }

  return <img style={{ width: "100%", height: "100%" }} src={src} />;
};

Avatar.propTypes = {
  symScore: PropTypes.any,
};

export default Avatar;
