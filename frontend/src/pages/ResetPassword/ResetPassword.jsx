import React, { useState } from "react";
import styles from "./style.module.css";
import { resetPassword } from "../../apis/user";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [Errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const validate = () => {
    const errors = {};
    if (!password) {
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

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    Object.keys(errors).length
      ? setErrors(errors)
      : (await resetPassword({ password, token })) && navigate("/login");
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.container} `} id="container">
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} action="POST">
            <h3 className={`${styles.h3} mb-4`}>Reset Password</h3>
            <input
              className={styles.input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="New Password"
            />
            <span className={styles.errorTexts}>{Errors.password}</span>

            <button className={`${styles.button} mt-2`} onClick={onSubmit}>
              Reset
            </button>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1}>Hello!</h1>
              <span className={styles.span}>
                You can Reset Your password from here
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
