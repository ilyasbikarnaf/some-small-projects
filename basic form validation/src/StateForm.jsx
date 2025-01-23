import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { checkEmail, checkPassword } from "./validators";

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailError = useMemo(() => {
    return isSubmitted ? checkEmail(email) : [];
  }, [email, isSubmitted]);

  const passwordError = useMemo(() => {
    return isSubmitted ? checkPassword(password) : [];
  }, [password, isSubmitted]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`form-group  ${emailError.length > 0 ? "error" : ""}`}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
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
