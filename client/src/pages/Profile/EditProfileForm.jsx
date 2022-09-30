import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import style from "./ProfilePage.module.css";
import appStyle from "../../App.module.css";
// Icons

import { useState } from "react";

export default function EditProfileForm(props) {
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const [isEmailFilled, setIsEmailFilled] = useState();
  const [isUsernameFilled, setIsUsernameFilled] = useState();

  function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;

    const userData = {
      email: enteredEmail,
      username: enteredUsername,
    };

    props.onSaveDetails(userData);
  }

  const emailChecker = (e) => {
    if (!e.target.value) {
      setIsEmailFilled(style.notFilled);
    } else {
      setIsEmailFilled("");
    }
  };
  const usernameChecker = (e) => {
    if (!e.target.value) {
      setIsUsernameFilled(style.notFilled);
    } else {
      setIsUsernameFilled("");
    }
  };

  return (
    <div className={style.userInformation}>
      <h2 className={style.subTitle}>Edit Your Details</h2>
      <div className={style.accountDetails}>
        <form onSubmit={submitHandler}>
          <p>
            <span className={appStyle.boldBody}>Username: </span>
            <input
              defaultValue={props.userDetails.username}
              placeholder="i.e. JohnDoe"
              type="text"
              required
              id="username"
              ref={usernameInputRef}
              aria-label="username"
              onChange={usernameChecker}
              onClick={usernameChecker}
              className={appStyle.body}
            />
          </p>
          <p>
            <span className={appStyle.boldBody}>Email: </span>
            <input
              defaultValue={props.userDetails.email}
              placeholder="i.e. johndoe@email.com"
              type="email"
              required
              id="email"
              ref={emailInputRef}
              aria-label="email"
              onChange={emailChecker}
              onClick={emailChecker}
              className={appStyle.body}
            />
          </p>
          <p>
            <span className={appStyle.boldBody}>SYM Score: </span>
            {props.userDetails.symScore}
          </p>
          <p>
            <span className={appStyle.boldBody}>Account created on: </span>
            {props.userDetails.dateCreated}
          </p>
          <div className={style.buttonsDiv}>
            <div className={style.singleButton}>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
    // <div className={style.editProfileForm}>
    //   <form onSubmit={submitHandler}>
    //     <Input
    //       label="email"
    //       src={envelop}
    //       placeholder="i.e. johndoe@email.com"
    //       type="email"
    //       required
    //       id="email"
    //       reference={emailInputRef}
    //       ariaLabel="email"
    //       onChange={emailChecker}
    //       onClick={emailChecker}
    //       isFilled={isEmailFilled}
    //     />

    //     <Input
    //       label="username"
    //       src={person}
    //       placeholder="i.e. JohnDoe"
    //       type="text"
    //       required
    //       id="username"
    //       reference={usernameInputRef}
    //       ariaLabel="username"
    //       onChange={usernameChecker}
    //       onClick={usernameChecker}
    //       isFilled={isUsernameFilled}
    //     />

    //     <div className={style.singleButton}>
    //       <Button type="submit">Save Changes</Button>
    //     </div>
    //   </form>
    // </div>
  );
}

EditProfileForm.propTypes = {
  onSaveDetails: PropTypes.func,
  userDetails: PropTypes.object,
};
