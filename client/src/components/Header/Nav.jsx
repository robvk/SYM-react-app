import React, { useContext, useEffect } from "react";
// import PropTypes from "prop-types";

import { Link } from "react-router-dom";
// import Logo from "../Logo";
import styles from "./Nav.module.css";
import appStyle from "../../App.module.css";
import UserInfoContext from "../../context/UserInfoContext";

const Nav = () => {
  const { token, setToken } = useContext(UserInfoContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [setToken]);

  return (
    <ul>
      <li className={styles.logoNav}>
        <Link key="0" to={token ? "/dashboard" : "/"}>
          {/* <Logo /> */}
        </Link>
      </li>
      <li className={appStyle.h1Desktop}>
        <Link key="1" to={token ? "/dashboard" : "/"}>
          <span>Home</span>
        </Link>
      </li>
      <li className={appStyle.h1Desktop}>
        <Link key="2" to={"/about"}>
          <span>About</span>
        </Link>
      </li>
      {token && (
        <li className={appStyle.h1Desktop}>
          <Link key="3" to={`/profile/${localStorage.getItem("userID")}`}>
            <span>Profile</span>
          </Link>
        </li>
      )}
      <li className={appStyle.h1Desktop}>
        <Link key="4" to={token ? "/" : "/login"}>
          <span>{token ? "Sign out" : "Login"}</span>
        </Link>
      </li>
    </ul>
  );
};

// Nav.propTypes = {
//   opened: PropTypes.func.isRequired,
// };

export default Nav;
