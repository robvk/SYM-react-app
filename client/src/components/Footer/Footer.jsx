import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import appStyle from "../../App.module.css";
import styles from "./Footer.module.css";
import UserInfoContext from "./../../context/UserInfoContext";

const Footer = () => {
  const { setToken, token, userID } = useContext(UserInfoContext);

  function scrollTop() {
    window.scrollTo(0, 0);
  }

  let landingDashboard = "/";
  let loginLogout = {
    to: "/login",
    name: "Login",
    onClick: scrollTop,
  };
  let signUpProfile = { to: "/", name: "Sign up" };
  if (token) {
    landingDashboard = "/home";
    signUpProfile = {
      to: `/profile/${userID}`,
      name: "Profile",
    };
    loginLogout = {
      to: "/",
      name: "Log out",
      onClick: () => {
        setToken("");
      },
    };
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.footerCol}>
          <div className={styles.footerWidget}>
            <div className={styles.logoContainer}>
              <Logo />
            </div>
            <div className={styles.footerLogo}>
              <p className={appStyle.headerOne}>STATE YOUR MIND</p>
              <div className={styles.footerText}>
                <p className={appStyle.headerOne}>
                  Make a statement and let the world respond!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerCol}>
          <ul className={appStyle.body}>
            <li className={appStyle.body}>
              <Link to={landingDashboard} onClick={scrollTop}>
                Home
              </Link>
            </li>
            <li className={appStyle.body}>
              <Link to={"/about"}>About</Link>
            </li>
            <li className={appStyle.body}>
              <Link to={signUpProfile.to} onClick={scrollTop}>
                {signUpProfile.name}
              </Link>
            </li>
            <li className={appStyle.body}>
              <Link to={loginLogout.to} onClick={loginLogout.onClick}>
                {loginLogout.name}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div className={styles.copyright}>
        <p className={appStyle.body}>
          &copy; {new Date().getFullYear()} State Your Mind
        </p>
      </div>
    </div>
  );
};

export default Footer;
