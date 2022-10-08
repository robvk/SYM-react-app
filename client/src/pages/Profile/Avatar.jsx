import React from "react";
import PropTypes from "prop-types";
import first from "../../assets/avatars/01.svg";
import second from "../../assets/avatars/02.svg";
import third from "../../assets/avatars/03.svg";
import fourth from "../../assets/avatars/04.svg";
import fifth from "../../assets/avatars/05.svg";
import sixth from "../../assets/avatars/06.svg";
import seventh from "../../assets/avatars/07.svg";
import eighth from "../../assets/avatars/08.svg";
import ninth from "../../assets/avatars/09.svg";
import tenth from "../../assets/avatars/10.svg";
import eleventh from "../../assets/avatars/11.svg";
import twelfth from "../../assets/avatars/12.svg";
import thirteenth from "../../assets/avatars/13.svg";
import fourteenth from "../../assets/avatars/14.svg";
import fifteenth from "../../assets/avatars/15.svg";
import sixteenth from "../../assets/avatars/16.svg";
import seventeenth from "../../assets/avatars/17.svg";
import eighteenth from "../../assets/avatars/18.svg";

const Avatar = (props) => {
  let src;
  switch (true) {
    case 0:
      src = first;
      break;
    case 1:
      src = second;
      break;
    case props.symScore > 1 && props.symScore < 10:
      src = third;
      break;
    case props.symScore > 10 && props.symScore < 20:
      src = fourth;
      break;
    case props.symScore > 20 && props.symScore < 30:
      src = fifth;
      break;
    case props.symScore > 40 && props.symScore < 50:
      src = sixth;
      break;
    case props.symScore > 50 && props.symScore < 60:
      src = seventh;
      break;
    case props.symScore > 60 && props.symScore < 70:
      src = eighth;
      break;
    case props.symScore > 70 && props.symScore < 80:
      src = ninth;
      break;
    case props.symScore > 80 && props.symScore < 90:
      src = tenth;
      break;
    case props.symScore > 90 && props.symScore < 100:
      src = eleventh;
      break;
    case props.symScore > 100 && props.symScore < 120:
      src = twelfth;
      break;
    case props.symScore > 120 && props.symScore < 140:
      src = thirteenth;
      break;
    case props.symScore > 140 && props.symScore < 160:
      src = fourteenth;
      break;
    case props.symScore > 160 && props.symScore < 180:
      src = fifteenth;
      break;
    case props.symScore > 180 && props.symScore < 200:
      src = sixteenth;
      break;
    case props.symScore > 220 && props.symScore < 250:
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
  symScore: PropTypes.number,
};

export default Avatar;
