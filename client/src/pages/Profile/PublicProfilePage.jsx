// React
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// Style
import style from "./ProfilePage.module.css";
import appStyle from "../../App.module.css";
// Component
import Error from "../../components/Error/Error";
import ProgressBar from "../../components/ProgressBar";
import Avatar from "../../components/Avatar";
import ProfileLevel from "./ProfileLevel";
// Hook
import useFetch from "../../hooks/useFetch";
import ActiveStatements from "./ActiveStatements";

const PublicProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    symScore: "",
    dateCreated: "",
  });

  const { id } = useParams();

  const onSuccess = (onReceived) => {
    if (userDetails.username === "") {
      setUserDetails(onReceived.result);
    }
  };

  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/profile/public/${id}`,
    onSuccess
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, []);

  if (!userDetails)
    return (
      <div>
        <h2 className={appStyle.headerOne}>
          The profile data is unavailable at the moment, please try again!
        </h2>
      </div>
    );

  return (
    <div>
      <ProgressBar loading={isLoading} />
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

        <div className={`${style.userInformation} ${appStyle.body}`}>
          <h3 className={style.subTitle}>User Details</h3>
          <div className={style.accountDetails}>
            <p className={appStyle.body}>
              <span className={appStyle.boldBody}>Username: </span>
              {userDetails.username}
            </p>
            <p className={appStyle.body}>
              <span className={appStyle.boldBody}>SYM Score: </span>
              {userDetails.symScore}
            </p>
            <p className={appStyle.body}>
              <span className={appStyle.boldBody}>Active since: </span>
              {userDetails.dateCreated}
            </p>
          </div>
        </div>
        <ActiveStatements />
        <Error error={error} />
      </div>
    </div>
  );
};

export default PublicProfilePage;
