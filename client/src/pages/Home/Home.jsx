// React
import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfoContext from "../../context/UserInfoContext";
// Hooks
import useFetch from "../../hooks/useFetch";

// Style
import style from "./Home.module.css";
import appStyle from "../../App.module.css";
import SignUpForm from "./SignUpForm";
import Error from "../../components/Error/Error";
import ProgressBar from "../../components/ProgressBar";
import bgImage from "../../assets/images/background-image.jpg";
import { setCookie } from "../../hooks/useCookie";
import NotifierContext from "../../context/NotifierContext";

const Home = () => {
  const navigate = useNavigate();
  // Context
  const { notifier } = useContext(NotifierContext);
  const { setToken, setUserID } = useContext(UserInfoContext);

  // Call back from backend
  const onSuccess = (onReceived) => {
    setCookie("token", onReceived.result.token, 7);
    setCookie("userID", onReceived.result.userID, 7);
    setToken(onReceived.result.token);
    setUserID(onReceived.result.userID);
    navigate("/feed", {
      replace: true,
    });
    notifier("Welcome back!");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  // Post request on user Sign up
  const onUserSignUp = (user) => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  return (
    <div>
      <ProgressBar loading={isLoading} />
      <div className={style.homeContainer}>
        <div className={style.bgImageContainer}>
          <img src={bgImage} className={style.bgImage} />
        </div>
        <div className={style.formContainer}>
          <div className={style.glassBox}>
            <h2 className={appStyle.headerOne}>MAKE A STATEMENT</h2>
            <SignUpForm onUserSignUp={onUserSignUp} />
            <Error error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
