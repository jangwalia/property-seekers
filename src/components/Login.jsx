import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import './Login.css'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formdata;
  const navigate = useNavigate();
  //handlechange
  const handlechange = (event) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  //handle showpassword
  const checkShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  //handleSubmit
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) navigate("/");
    } catch (error) {
      toast.error("Bad Credentials....")
    }
  };
  return (
    <div>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handlechange}
              type="text"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                onChange={handlechange}
                className="passwordInput"
                placeholder="Password"
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
              forgot password
            </Link>
            <div className="signInBar">
              <p className="signInText">Log In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="white" width="34px" height="34px" />
              </button>
            </div>
          </form>
          <Link to="/signup" className="registerLink">
            Register Instead
          </Link>
        </main>
      </div>
    </div>
  );
}
