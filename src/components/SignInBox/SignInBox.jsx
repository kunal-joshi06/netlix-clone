import React, { useRef } from "react";
import "./SignInBox.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignInBox = () => {
  const auth = getAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((user) => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="sign-up-container">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signup-grey-text"> New to Netflix? </span>{" "}
          <span className="signup-link" onClick={register}>
            Sign up Now
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignInBox;
