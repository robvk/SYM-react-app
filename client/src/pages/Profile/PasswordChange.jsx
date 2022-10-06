import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
// Style
import style from "./ProfilePage.module.css";
import appStyle from "../../App.module.css";
import Input from "../../components/Input";
import password from "../../assets/icons/lock-icon.svg";

export default function PasswordChange(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const passwordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();
  const [isPasswordFilled, setIsPasswordFilled] = useState();
  const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState();
  const [isNewPasswordFilled, setIsNewPasswordFilled] = useState();

  function submitHandler(e) {
    e.preventDefault();

    const currentPassword = passwordInputRef.current.value;
    const newPassword = newPasswordInputRef.current.value;

    const password = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    props.onSaveDetails(password);
  }

  const passwordMatch = () => {
    if (
      newPasswordInputRef.current.value !==
        confirmNewPasswordInputRef.current.value ||
      !newPasswordInputRef.current.value
    ) {
      setIsDisabled(true);
      setIsConfirmPasswordFilled(style.notFilled);
    } else {
      setIsDisabled(false);
      setIsConfirmPasswordFilled("");
    }
  };

  const passwordChecker = (e) => {
    if (!e.target.value) {
      setIsPasswordFilled(style.notFilled);
    } else {
      setIsPasswordFilled("");
    }
  };

  const newPasswordChecker = (e) => {
    passwordMatch();
    if (!e.target.value) {
      setIsNewPasswordFilled(style.notFilled);
    } else {
      setIsNewPasswordFilled("");
    }
  };

  const confirmPasswordChecker = (e) => {
    if (
      !e.target.value ||
      confirmNewPasswordInputRef.current.value !==
        passwordInputRef.current.value
    ) {
      setIsDisabled(true);
      setIsConfirmPasswordFilled(style.notFilled);
    } else {
      setIsDisabled(false);
      setIsConfirmPasswordFilled("");
    }
  };

  return (
    <div className={style.userInformation}>
      <h2 className={style.subTitle}>Change Password</h2>
      <div className={style.accountDetails}>
        <form className={appStyle.body} onSubmit={submitHandler}>
          <Input
            label="password"
            placeholder="i.e. OldPassword123!"
            src={password}
            type="password"
            required
            id="password"
            reference={passwordInputRef}
            ariaLabel="password"
            onClick={passwordChecker}
            onChange={passwordChecker}
            isFilled={isPasswordFilled}
          />

          <Input
            label="new password"
            placeholder="i.e. NewPassword123!"
            src={password}
            type="password"
            required
            id="newPassword"
            reference={newPasswordInputRef}
            ariaLabel="newPassword"
            onClick={newPasswordChecker}
            onChange={newPasswordChecker}
            isFilled={isNewPasswordFilled}
          />

          <Input
            label="confirm new password"
            placeholder="NewPassword123!"
            src={password}
            type="password"
            required
            id="confirmNewPassword"
            reference={confirmNewPasswordInputRef}
            ariaLabel="confirmNewPassword"
            onClick={confirmPasswordChecker}
            onChange={confirmPasswordChecker}
            isFilled={isConfirmPasswordFilled}
          />
          <div className={style.singleButton}>
            <Button
              type="submit"
              disabled={isDisabled}
              class={isDisabled ? "buttonDisabled" : ""}
            >
              Save
            </Button>
          </div>
          <div className={style.singleButton}>
            <Button
              type="button"
              class="buttonBorder"
              buttonHandler={props.passwordChange}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

PasswordChange.propTypes = {
  onSaveDetails: PropTypes.func,
  userDetails: PropTypes.object,
  passwordChange: PropTypes.func,
};
