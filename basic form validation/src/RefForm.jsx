import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { checkEmail, checkPassword } from "./validators";

export default function App() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitted(true);

    const emailResults = checkEmail(emailRef.current.value);
    const passwordResults = checkPassword(passwordRef.current.value);

    setEmailError(emailResults);
    setPasswordError(passwordResults);

    if (passwordResults.length === 0 && emailResults.length === 0) {
      alert("Sucess");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`form-group  ${emailError.length > 0 ? "error" : ""}`}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            onChange={
              isSubmitted
                ? (e) => setEmailError(checkEmail(e.target.value))
                : undefined
            }
            className="input"
            type="email"
            id="email"
            ref={emailRef}
          />
          {emailError.length > 0 && (
            <div className="msg">{emailError.join(", ")}</div>
          )}
        </div>
        <div
          className={`form-group  ${passwordError.length > 0 ? "error" : ""}`}
        >
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            onChange={
              isSubmitted
                ? (e) => setPasswordError(checkPassword(e.target.value))
                : undefined
            }
            type="password"
            id="password"
            ref={passwordRef}
          />
          {passwordError.length > 0 && (
            <div className="msg">{passwordError.join(", ")}</div>
          )}
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
