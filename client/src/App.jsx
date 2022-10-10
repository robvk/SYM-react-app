import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Header/Nav";
import Home from "./pages/Home/Home";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import CreateStatementController from "./pages/Statement/CreateStatementController";
import Notifier from "./components/Notifier";
import StatementDetails from "./pages/Statement/StatementDetails";
import Feed from "./pages/Feed/Feed";
import UserInfoContext from "./context/UserInfoContext";
import About from "./pages/About/About";
import ProfilePage from "./pages/Profile/ProfilePage";

// Style
import style from "./App.module.css";
import { getCookie } from "./hooks/useCookie";

const App = () => {
  const [user, setUser] = useState(false);
  const { token } = useContext(UserInfoContext);

  useEffect(() => {
    getCookie("token") ? setUser(true) : setUser(false);
  }, [token]);

  return (
    <div className={style.lightTheme}>
      <Nav />
      <Notifier />
      <Routes>
        {!user ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/feed" element={<Feed />} />
        )}
        <Route path="/login" element={<Login />} />
        {user && <Route path="/job/view/:id" element={<StatementDetails />} />}
        {!user && <Route path="/login" element={<Login />} />}
        {user && (
          <Route
            path="/statements/create"
            element={<CreateStatementController />}
          />
        )}
        {user && <Route path="/feed" element={<Feed />} />}
        <Route path="/about" element={<About />} />
        {user && <Route path="/profile/:id" element={<ProfilePage />} />}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
