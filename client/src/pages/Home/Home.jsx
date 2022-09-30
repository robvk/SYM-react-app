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

const Home = () => {
  const navigate = useNavigate();

  const { setToken, setUserID, setUsername } = useContext(UserInfoContext);

  // Call back from backend
  const onSuccess = (onReceived) => {
    setToken(onReceived.result.token);
    setUserID(onReceived.result.userID);
    setUsername(onReceived.result.username);
    navigate("/", {
      replace: true,
    });
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
