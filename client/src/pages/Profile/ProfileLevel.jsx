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
    case props.symScore >= 20 && props.symScore < 40:
      level = "Don't care";
      break;
    case props.symScore >= 40 && props.symScore < 60:
      level = "Can't be Stopped";
      break;
    case props.symScore >= 60 && props.symScore < 80:
      level = "Trump";
      break;
    case props.symScore >= 80 && props.symScore < 90:
      level = "New Anchor";
      break;
    case props.symScore >= 90 && props.symScore < 110:
      level = "Taxi Driver";
      break;
    case props.symScore >= 110 && props.symScore < 130:
      level = "Toxic";
      break;
    case props.symScore >= 130 && props.symScore < 150:
      level = "Salty Ex";
      break;
    case props.symScore >= 150 && props.symScore < 170:
      level = "Jealous Girlfriend";
      break;
    case props.symScore >= 170 && props.symScore < 190:
      level = "Alex Jones";
      break;
    case props.symScore >= 190 && props.symScore < 210:
      level = "CNN";
      break;
    case props.symScore >= 210 && props.symScore < 230:
      level = "Crackhead";
      break;
    case props.symScore >= 230 && props.symScore < 250:
      level = "Allday Errday";
      break;
    case props.symScore >= 250 && props.symScore < 300:
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
