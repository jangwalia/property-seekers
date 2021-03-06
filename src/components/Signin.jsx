import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import createAccount from "../assets/svg/createAccount.png"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import './Signin.css'

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formdata;
  const navigate = useNavigate();
  //handle form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      navigate("/");
      const formDataCopy = { ...formdata };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
    } catch (error) {
      toast.error("Bad Credentials....")
    }

    // ...
  };
  //handleChange
  const handleChange = (event) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  //handle showpassword
  const checkShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div>
      <div className="signInContainer shadow-lg p-8 mb-5 rounded">
        <header className="signInTitle">
        <img src={createAccount} className="createAccountIcon"/>
          <p >Create Your Account</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
            />
            <input
              onChange={handleChange}
              type="text"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className="passwordInput"
                placeholder="Password-Minimum 6 characters"
                value={password}
                id="password"
              />
              <img
                src={visibilityIcon}
                alt="showPassword"
                className="showPassword"
                onClick={() => checkShowPassword()}
              />
              
            </div>
            <Link to="/forgotPassword" className="forgotPasswordLink">
              Forgot password
            </Link>
            <div className="signUpBar">
              <p className="signUpText">Register</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="white" width="34px" height="34px" />
              </button>
            </div>
          </form>
          <Link to="/login" className="registerLink">
            Log In..if Already Registered
          </Link>
        </main>
      </div>
    </div>
  );
}
