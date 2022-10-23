// React
import React, { useRef } from "react";
import PropTypes from "prop-types";
// Component
import Button from "../../components/Button";
// Style
import style from "./ProfilePage.module.css";
import appStyle from "../../App.module.css";
export default function EditProfileForm(props) {
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
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
  );
}
EditProfileForm.propTypes = {
  onSaveDetails: PropTypes.func,
  userDetails: PropTypes.object,
};
