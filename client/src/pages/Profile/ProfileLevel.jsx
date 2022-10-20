import React from "react";
import PropTypes from "prop-types";

import appStyle from "../../App.module.css";

const ProfileLevel = (props) => {
  let level;
  switch (true) {
    case 0:
      level = "n00b";
      break;
    case props.symScore === 1:
      level = "First SYM-er";
      break;
    case props.symScore > 1 && props.symScore < 10:
      level = "Preacher";
      break;
    case props.symScore >= 10 && props.symScore < 20:
      level = "Journalist";
      break;
    case props.symScore >= 20 && props.symScore < 30:
      level = "Don't care";
      break;
    case props.symScore >= 40 && props.symScore < 50:
      level = "Can't be Stopped";
      break;
    case props.symScore >= 50 && props.symScore < 60:
      level = "Trump";
      break;
    case props.symScore >= 60 && props.symScore < 70:
      level = "New Anchor";
      break;
    case props.symScore >= 70 && props.symScore < 80:
      level = "Taxi Driver";
      break;
    case props.symScore >= 80 && props.symScore < 90:
      level = "Toxic";
      break;
    case props.symScore >= 90 && props.symScore < 100:
      level = "Salty Ex";
      break;
    case props.symScore >= 100 && props.symScore < 120:
      level = "Jealous Girlfriend";
      break;
    case props.symScore >= 120 && props.symScore < 140:
      level = "Alex Jones";
      break;
    case props.symScore >= 140 && props.symScore < 160:
      level = "CNN";
      break;
    case props.symScore >= 160 && props.symScore < 180:
      level = "Crackhead";
      break;
    case props.symScore >= 180 && props.symScore < 200:
      level = "Allday Errday";
      break;
    case props.symScore >= 220 && props.symScore < 250:
      level = "I was here first";
      break;
    case props.symScore >= 300:
      level = "Heisenberg";
      break;
    default:
      level = "n00b";
  }

  return (
    <p
      className={appStyle.body}
      style={{ fontSize: "16px", marginTop: "-25px" }}
    >
      Rank: {level}
    </p>
  );
};

ProfileLevel.propTypes = {
  symScore: PropTypes.any,
};

export default ProfileLevel;
