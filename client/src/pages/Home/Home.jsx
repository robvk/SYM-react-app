// React
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import UserInfoContext from "../../context/UserInfoContext";
// Hooks
import useFetch from "../../hooks/useFetch";
// Style
import style from "./Home.module.css";
import appStyle from "../../App.module.css";
import SignUpForm from "./SignUpForm";
import Error from "../../components/Error/Error";

const Home = () => {
  // const [totalJobAmount, setTotalJobAmount] = useState();
  // const [sendersAmount, setSendersAmount] = useState();
  // const [deliverersAmount, setDeliverersAmount] = useState();

  const navigate = useNavigate();

  const { setToken } = useContext(UserInfoContext);

  const onSuccess = (onReceived) => {
    // setTotalJobAmount(onReceived.result.numOfTotalJobs);
    // setSendersAmount(onReceived.result.numOfSenders);
    // setDeliverersAmount(onReceived.result.numOfDeliverers);

    localStorage.setItem("token", onReceived.result.token);
    setToken(onReceived.data);
    localStorage.setItem("userID", onReceived.result.userID);
    navigate("/home", {
      replace: true,
    });
  };

  // const { performFetch, cancelFetch } = useFetch("/data/values", onSuccess);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

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
    // performFetch({
    //   method: "GET",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // });
    return cancelFetch;
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      <SignUpForm onUserSignUp={onUserSignUp} />
      <div className={appStyle.body}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
      {error != null && <Error error={error} />}
    </div>
  );
};

export default Home;
