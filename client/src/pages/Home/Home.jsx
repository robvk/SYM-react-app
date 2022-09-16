// React
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading/Loading";
import UserInfoContext from "../../context/UserInfoContext";
// Hooks
import useFetch from "../../hooks/useFetch";

// Style
import style from "./Home.module.css";
import appStyle from "../../App.module.css";
import SignUpForm from "./SignUpForm";
import Error from "../../components/Error/Error";
import ProgressBar from "../../components/ProgressBar";

const Home = () => {
  const [totalJobAmount, setTotalJobAmount] = useState();
  const [sendersAmount, setSendersAmount] = useState();
  const [deliverersAmount, setDeliverersAmount] = useState();

  const navigate = useNavigate();

  const { setToken, setUserID } = useContext(UserInfoContext);

  // Call back from backend
  const onSuccess = (onReceived) => {
    if (onReceived.result.type === "database")
      setTotalJobAmount(onReceived.result.numOfTotalJobs);
    setSendersAmount(onReceived.result.numOfSenders);
    setDeliverersAmount(onReceived.result.numOfDeliverers);

    setToken(onReceived.result.token);
    setUserID(onReceived.result.userID);
    navigate("/home", {
      replace: true,
    });
  };

  const { performFetch: fetchDatabase, cancelFetch: cancelFetchDatabase } =
    useFetch("/data/values", onSuccess);
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

  // Fetch database nums + cancel fetch requests
  useEffect(() => {
    fetchDatabase({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetchDatabase, cancelFetch;
  }, []);

  return (
    <div>
      {isLoading && <ProgressBar />}

      <SignUpForm onUserSignUp={onUserSignUp} />

      <div className={appStyle.body}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
      {error != null && <Error error={error} />}
    </div>
  );
};

export default Home;
