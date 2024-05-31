import React, { useState } from "react";
import styles from "./style.module.css";
import { forgotPassword } from "../../apis/user";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [Errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    const regex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/;
    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not valid Email format!";
    }
    return errors;
  };
  const clearForm = () => {
    setEmail("");
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    Object.keys(errors).length
      ? setErrors(errors)
      : (await forgotPassword(email)) && clearForm();
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.container} `} id="container">
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} action="POST">
            <h3 className={`${styles.h3} mb-4`}>Forgot Password</h3>
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
            <Link to="/login" className="mt-3">
              Login?
            </Link>
            <button className={`${styles.button} mt-2`} onClick={onSubmit}>
              Get Link
            </button>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1}>Hello!</h1>
              <span className={styles.span}>
                Forgot your password? No problem. enter Email to get password
                Regeneration link.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
