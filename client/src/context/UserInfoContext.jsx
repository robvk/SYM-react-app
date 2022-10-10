import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCookie } from "../hooks/useCookie";
import useFetch from "../hooks/useFetch";

const UserInfoContext = createContext({
  email: "",
  setEmail: () => {},
  username: "",
  setUsername: () => {},
  symScore: "",
  setSymScore: () => {},
  StatementsOfUser: {},
  setStatementsOfUser: () => {},
  token: "",
  setToken: () => {},
  userID: "",
  setUserID: () => {},
});

export function UserInfoContextProvider(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [StatementsOfUser, setStatementsOfUser] = useState({});
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [symScore, setSymScore] = useState("");

  const context = {
    email,
    setEmail,
    username,
    setUsername,
    symScore,
    setSymScore,
    StatementsOfUser,
    setStatementsOfUser,
    token,
    setToken,
    userID,
    setUserID,
  };

  const onSuccess = (onReceived) => {
    setUsername(onReceived.result.username);
    setToken(onReceived.result.token);
    setUserID(onReceived.result.userID);
    setSymScore(onReceived.result.symScore);
  };

  const { performFetch, cancelFetch } = useFetch(
    `/profile/${getCookie("userID")}`,
    onSuccess
  );

  useEffect(() => {
    if (getCookie("userID")) {
      performFetch({
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
    }
    return cancelFetch;
  }, [username, symScore, userID]);

  return (
    <UserInfoContext.Provider value={context}>
      {props.children}
    </UserInfoContext.Provider>
  );
}

UserInfoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserInfoContext;
