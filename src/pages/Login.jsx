import React, { useState } from "react";
import "../styles/LoginScreen.css";
import SignInBox from "../components/SignInBox/SignInBox";
const Login = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="login-screen">
      <div className="login-screen-background">
        <img
          className="login-screen-logo"
          src="netflix-logo.png"
          alt="login-bg"
        />
        <button className="sign-in-btn" onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className="login-screen-gradient" />
      </div>

      <div className="login-container">
        {signIn ? (
          <SignInBox />
        ) : (
          <>
            <h1>Unlimited films, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel at anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="login-inputs-container">
              <form>
                <button
                  className="login-getStarted-btn"
                  onClick={() => setSignIn(true)}
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
