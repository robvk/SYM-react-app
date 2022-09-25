// React
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// Icons
// Style
import style from "./ProfilePage.module.css";
import appStyle from "../../App.module.css";
// Component
import Button from "../../components/Button";
import Error from "../../components/Error/Error";
import ProgressBar from "../../components/ProgressBar";
// Hook
import useFetch from "../../hooks/useFetch";
import NotifierContext from "../../context/NotifierContext";
import EditProfileForm from "./EditProfileForm";
import UserInfoContext from "../../context/UserInfoContext";
import { deleteCookie, getCookie } from "../../hooks/useCookie";

const ProfilePage = () => {
  const { setToken } = useContext(UserInfoContext);

  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
  });

  const [deleteHelper, setDeleteHelper] = useState(false);
  const [editHelper, setEditHelper] = useState(false);
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

  const onSuccess = (onReceived) => {
    if (onReceived.isDelete) {
      deleteCookie("userID");
      deleteCookie("token");
      setToken("");
      return;
    }

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

  let deletePrompt = (
    <div className={style.deletePrompt}>
      <p className={appStyle.h1Desktop}>
        Are you sure you would like to delete your profile?
      </p>
      <div className={style.red}>
        <p className={appStyle.bodyDesktop}>This action cannot be undone</p>
      </div>

      <div className={style.buttonDiv}>
        <div className={style.singleButton}>
          <Button path="/" buttonHandler={() => deleteProfile()}>
            Delete
          </Button>
        </div>
        <div className={style.singleButton}>
          <Button buttonHandler={() => setDeleteHelper(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  );

  const deleteHandler = () => {
    setDeleteHelper(true);
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
  };

  const editUserHandler = (userData) => {
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
  };

  return (
    <div>
      <ProgressBar loading={isLoading} />
      <Error error={error} />

      {editHelper && (
        <EditProfileForm user={userDetails} onSaveDetails={editUserHandler} />
      )}
    </div>
  );
};

export default ProfilePage;
