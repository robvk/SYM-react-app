// React
import React from "react";
import PropTypes from "prop-types";
// Style
import style from "./ProfilePage.module.css";
import appStyle from "../../App.module.css";
// Component
import Button from "../../components/Button";

const DeletePrompt = (props) => {
  return (
    <div className={style.deletePrompt}>
      <div className={style.userInformation}>
        <h2 className={style.subTitle}>Delete Profile</h2>
        <div className={style.padding}>
          <p className={appStyle.boldBody}>
            Are you sure you would like to delete your profile?
          </p>
          <div className={style.red}>
            <p className={appStyle.body}>This action cannot be undone</p>
          </div>
        </div>
        <div className={style.buttonsDiv}>
          <div className={style.singleButton}>
            <Button path="/" buttonHandler={() => props.deleteProfile()}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeletePrompt.propTypes = {
  deleteProfile: PropTypes.func,
};

export default DeletePrompt;
