import React, { useState } from "react";
import styles from "./style.module.css";
import { signUp, logIn } from "../../apis/user";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [Errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setRightPanelActive(false);
    clearForm();
  };

  const handleSignUpClick = () => {
    setRightPanelActive(true);
    clearForm();
  };

  const validate = (isSignup) => {
    const errors = {};
    const regex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/;
    if (isSignup && !name) {
      errors.name = "Name is required!";
    } else if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not valid Email format!";
    } else if (!password) {
      errors.password = "Password is required!";
    } else if (password.length < 8) {
      errors.password = "Password must be more that 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      errors.password =
        "Password must contain minimum One UpperCase Character, One LowerCase Character, One special character and One number.!";
    }
    return errors;
  };

  const clearForm = () => {
    setEmail("");
    setName("");
    setPassword("");
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rightPanelActive) {
        const errors = validate(true);
        Object.keys(errors).length
          ? setErrors(errors)
          : (await signUp({ name, email, password })) && handleSignInClick();
      } else {
        const errors = validate();
        Object.keys(errors).length
          ? setErrors(errors)
          : (await logIn({ name, email, password })) && navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.body}>
      <div
        className={`${styles.container} ${
          rightPanelActive ? styles.rightPanelActive : ""
        }`}
        id="container"
      >
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form className={styles.form} action="POST">
            <h1 className={styles.h1}>Create Account</h1>

            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            />
            <span className={styles.errorTexts}>{Errors.name}</span>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <span className={styles.errorTexts}>{Errors.email}</span>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <span className={styles.errorTexts}>{Errors.password}</span>
            <button className={`${styles.button} mt-2`} onClick={onSubmit}>
              Sign Up
            </button>
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} action="POST">
            <h1 className={styles.h1}>Sign in</h1>
            <input
              className={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
            />
            <span className={styles.errorTexts}>{Errors.email}</span>
            <input
              className={styles.input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <span className={styles.errorTexts}>{Errors.password}</span>
            <Link to="/forgotPassword" className="mt-3">
              Forgot your password?
            </Link>
            <button className={`${styles.button} mt-2`} onClick={onSubmit}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.h1}>Welcome Back!</h1>
              <span className={styles.span}>
                To keep connected with us please login with your personal info
              </span>
              <button
                className={`${styles.button} ${styles.ghost}`}
                id="signIn"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1}>Hello, Friend!</h1>
              <span className={styles.span}>
                Enter your personal details and start journey with us
              </span>
              <button
                className={`${styles.button} ${styles.ghost}`}
                id="signUp"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
