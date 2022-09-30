// React
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Components
import Logo from "../Logo";
import {
  VscAdd,
  VscAccount,
  VscChevronDown,
  VscMenu,
  VscClose,
} from "react-icons/vsc";
// Style
import style from "./Nav.module.css";
import appStyle from "../../App.module.css";

// Contexts
import UserInfoContext from "../../context/UserInfoContext";
// Hooks
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { deleteCookie, getCookie } from "../../hooks/useCookie";

const Nav = () => {
  const { width } = useWindowDimensions();
  const { token, setToken, setUserID, setUsername, username } =
    useContext(UserInfoContext);

  const [isOpen, setIsOpen] = useState("none");

  useEffect(() => {
    setToken(getCookie("token"));
    setUsername(getCookie("username"));
  }, [setToken, setUsername]);

  const logOut = () => {
    deleteCookie("token");
    deleteCookie("userID");
    deleteCookie("username");
    setToken("");
    setUserID("");
    setUsername("");
    width <= 700 && mobileNavigator();
  };

  const mobileNavigator = () => {
    isOpen === "block" ? setIsOpen("none") : setIsOpen("block");
  };

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
            {token && (
              <li className={style.plus}>
                <Link key="0" to="#">
                  <VscAdd />
                </Link>
              </li>
            )}
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
            {!token ? (
              <li className={appStyle.navLinks}>
                <Link key="3" to="/login">
                  <span>Login</span>
                </Link>
              </li>
            ) : (
              <li className={appStyle.navLinks}>
                <div className={style.dropdown}>
                  <div className={style.username}>
                    <VscAccount />
                    <p className={style.dropBtn}>{username}</p>
                    <VscChevronDown />
                  </div>

                  <div className={style.dropdownContent}>
                    <Link key="4" to={`/profile/${getCookie("userID")}`}>
                      <span>Profile</span>
                    </Link>
                    <Link onClick={logOut} key="5" to="/">
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              </li>
            )}
          </div>
        </ul>
      )}
      {width <= 700 && (
        <div className={appStyle.navLinks}>
          <div className={style.topNav}>
            <div className={style.logoNav}>
              <Link className={style.active} key="0" to={token ? "/home" : "/"}>
                <div className={style.logoDiv}>
                  <Logo />
                </div>
              </Link>
            </div>

            <div id="myLinks" style={{ display: isOpen }}>
              {token && (
                <Link onClick={mobileNavigator} key="0" to="#">
                  <p>New Statement</p>
                </Link>
              )}
              <Link
                onClick={mobileNavigator}
                key="1"
                to={token ? "/home" : "/"}
              >
                <span>Home</span>
              </Link>
              <Link onClick={mobileNavigator} key="2" to={"/about"}>
                <span>About</span>
              </Link>
              {!token ? (
                <Link onClick={mobileNavigator} key="3" to="/login">
                  <span>Login</span>
                </Link>
              ) : (
                <div>
                  <Link
                    onClick={mobileNavigator}
                    key="4"
                    to={`/profile/${getCookie("userID")}`}
                  >
                    <span>Profile</span>
                  </Link>
                  <Link onClick={logOut} key="5" to="/">
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>

            <a href="#" className={style.icon} onClick={mobileNavigator}>
              {isOpen === "block" ? <VscClose /> : <VscMenu />}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
