// React
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// Icons
import { VscEdit, VscTrash } from "react-icons/vsc";
// Style
import style from "./ProfilePage.module.css";
import appStyle from "../../App.module.css";
// Component
import Button from "../../components/Button";
import Error from "../../components/Error/Error";
import ProgressBar from "../../components/ProgressBar";
import Avatar from "../../components/Avatar";
import ProfileLevel from "./ProfileLevel";
import BackgroundImage from "../../components/BackgroundImage";
import EditProfileForm from "./EditProfileForm";
import PasswordChange from "./PasswordChange";
import ActiveStatements from "./ActiveStatements";
import DeletePrompt from "./DeletePrompt";
// Hook
import useFetch from "../../hooks/useFetch";
import { deleteCookie, getCookie } from "../../hooks/useCookie";
// Context
import NotifierContext from "../../context/NotifierContext";
import UserInfoContext from "../../context/UserInfoContext";

const ProfilePage = () => {
  const { setToken, setUsername } = useContext(UserInfoContext);
  const [userDetails, setUserDetails] = useState({
    userID: "",
    email: "",
    username: "",
    symScore: "",
    dateCreated: "",
  });
  const [deleteHelper, setDeleteHelper] = useState(false);
  const [editHelper, setEditHelper] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { id } = useParams();
  const { notifier } = useContext(NotifierContext);
  // Check if the user's ID matches the profile
  if (id !== getCookie("userID")) {
    return (
      <div className={style.notYourProfile}>
        <h2 className={appStyle.h1Desktop}>
          The page you are trying to view does not exist.
        </h2>
      </div>
    );
  }
  // Profile Fetch
  const onSuccess = (onReceived) => {
    changePassword && setChangePassword(false);
    if (onReceived.isDelete) {
      deleteCookie("userID");
      deleteCookie("token");
      setToken("");
      return;
    }
    setUsername(onReceived.result.username);
    if (userDetails.username === "") {
      setUserDetails(onReceived.result);
    }
    setEditHelper(false);
    if (onReceived.message) notifier(onReceived.message);
  };
  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/profile/${id}`,
    onSuccess
  );
  useEffect(() => {
    if (id === getCookie("userID")) {
      performFetch({
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      return cancelFetch;
    }
  }, [userDetails]);

  const changePassHandler = () => {
    changePassword ? setChangePassword(false) : setChangePassword(true);
  };
  const deleteHandler = () => {
    setDeleteHelper(true);
    setEditHelper(false);
  };
  const deleteProfile = () => {
    performFetch({
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    return cancelFetch;
  };
  const editHandler = () => {
    editHelper ? setEditHelper(false) : setEditHelper(true);
    setDeleteHelper(false);
  };
  const editUserHandler = (userData) => {
    if (changePassHandler) {
      performFetch({
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ password: userData }),
      });
    } else {
      const newUSerDetails = {
        username: userData.username,
        email: userData.email,
      };
      performFetch({
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user: newUSerDetails }),
      });

      setUserDetails(newUSerDetails);

      setEditHelper(false);
    }
  };

  return (
    <div className={style.profilePage}>
      <ProgressBar loading={isLoading} />
      <BackgroundImage space={true} />
      <div className={style.profileContainer}>
        <div className={style.profileHeader}>
          <div className={style.userSection}>
            <div className={style.iconCircle}>
              <Avatar symScore={userDetails.symScore} />
            </div>
            <p className={appStyle.headerOne}>{userDetails.username}</p>
            <ProfileLevel symScore={userDetails.symScore} />
          </div>
        </div>
        <div className={style.banner}>
          {!changePassword && (
            <div className={style.buttonsDiv}>
              <div className={style.singleButton}>
                <Button
                  buttonHandler={editHandler}
                  class={editHelper ? "buttonBorder" : ""}
                >
                  {!editHelper ? (
                    <span>
                      <VscEdit /> Edit Profile
                    </span>
                  ) : (
                    "Cancel"
                  )}
                </Button>
              </div>
              {deleteHelper ? (
                <div className={style.singleButton}>
                  <Button
                    class="buttonBorder"
                    buttonHandler={() => setDeleteHelper(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className={style.singleButton}>
                  <Button buttonHandler={deleteHandler}>
                    <VscTrash /> Delete Account
                  </Button>
                </div>
              )}
            </div>
          )}

          {!changePassword && (
            <div className={appStyle.body}>
              {deleteHelper ? (
                <DeletePrompt deleteProfile={deleteProfile} />
              ) : (
                <div>
                  {!editHelper ? (
                    <div className={style.userInformation}>
                      <h2 className={style.subTitle}>User Details</h2>
                      <div className={style.accountDetails}>
                        <p className={appStyle.body}>
                          <span className={appStyle.boldBody}>Username: </span>
                          {userDetails.username}
                        </p>
                        <p className={appStyle.body}>
                          <span className={appStyle.boldBody}>Email: </span>
                          {userDetails.email}
                        </p>
                        <p className={appStyle.body}>
                          <span className={appStyle.boldBody}>SYM Score: </span>
                          {userDetails.symScore}
                        </p>
                        <p className={appStyle.body}>
                          <span className={appStyle.boldBody}>
                            Account created on:{" "}
                          </span>
                          {userDetails.dateCreated}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <EditProfileForm
                      userDetails={userDetails}
                      onSaveDetails={editUserHandler}
                    />
                  )}
                </div>
              )}

              <div className={style.changePassword}>
                <button className={appStyle.body} onClick={changePassHandler}>
                  Change password
                </button>
              </div>
            </div>
          )}
          {changePassword && (
            <PasswordChange
              onSaveDetails={editUserHandler}
              passwordChange={changePassHandler}
            />
          )}
          <ActiveStatements />
          <Error error={error} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
