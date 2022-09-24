import React, { useContext, useEffect } from "react";
// import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import Logo from "../Logo";
import style from "./Nav.module.css";
import appStyle from "../../App.module.css";
import UserInfoContext from "../../context/UserInfoContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Nav = () => {
  const { width } = useWindowDimensions();
  const { token, setToken } = useContext(UserInfoContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [setToken]);

  return (
    <div>
      {width > 700 && (
        <ul className={style.navContainer}>
          <div className={style.fullLogo}>
            <li className={style.logoNav}>
              <Link key="0" to={token ? "/home" : "/"}>
                <div className={style.logoDiv}>
                  <Logo />
                </div>
                <h1 className={appStyle.navLinks}>State Your Mind</h1>
              </Link>
            </li>
          </div>
          <div className={style.allLinks}>
            <li className={appStyle.navLinks}>
              <Link key="1" to={token ? "/home" : "/"}>
                <span>Home</span>
              </Link>
            </li>
            <li className={appStyle.navLinks}>
              <Link key="2" to={"/about"}>
                <span>About</span>
              </Link>
            </li>
            {token && (
              <li className={appStyle.navLinks}>
                <Link key="3" to={`/profile/${localStorage.getItem("userID")}`}>
                  <span>Profile</span>
                </Link>
              </li>
            )}
            <li className={appStyle.navLinks}>
              <Link key="4" to={token ? "/" : "/login"}>
                <span>{token ? "Sign out" : "Login"}</span>
              </Link>
            </li>
          </div>
        </ul>
      )}
      {width <= 700 && <p>Mobile!</p>}
    </div>
  );
};

// Nav.propTypes = {
//   opened: PropTypes.func.isRequired,
// };

export default Nav;
