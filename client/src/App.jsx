import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Header/Nav";
import Home from "./pages/Home/Home";
import AddCar from "./pages/SignUp/AddCar";
import SignUp from "./pages/SignUp/SignUp";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import CreateJobController from "./pages/Job/CreateJobController";
import Notifier from "./components/Notifier";
import JobDetails from "./pages/Job/JobDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserInfoContext from "./context/UserInfoContext";
import About from "./pages/About/About";
import ProfilePage from "./pages/Profile/ProfilePage";

const App = () => {
  const [user, setUser] = useState("");
  const { token } = useContext(UserInfoContext);

  useEffect(() => {
    setUser(localStorage.getItem("token"));
  }, [token]);

  return (
    <>
      <Nav />
      <Notifier />
      <Routes>
        {!user ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {!user && <Route path="/user/create" element={<SignUp />}></Route>}
        <Route path="/user/create/add-car" element={<AddCar />} />
        <Route path="/login" element={<Login />} />
        {user && <Route path="/job/view/:id" element={<JobDetails />} />}
        {!user && <Route path="/login" element={<Login />} />}
        {user && (
          <Route path="/jobs/create" element={<CreateJobController />} />
        )}
        {user && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/about" element={<About />} />
        {user && <Route path="/profile/:id" element={<ProfilePage />} />}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
