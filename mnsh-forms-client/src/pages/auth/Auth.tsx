import React, { useState } from "react";

const Auth = () => {
  const [currentState, setCurrentState] = useState("login");
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="bg-burnt-orange brutal-shadow brutal-border-sharp flex flex-col items-center justify-center px-15 py-7">
        <h2 className="font-heading text-5xl font-bold">Welcome</h2>
        <div className="brutal-border-sharp flex flex-row">
          <p
            className={
              currentState == "login"
                ? "bg-tomato font-body cursor-pointer px-10 py-1 text-2xl font-bold"
                : "bg-cream font-body cursor-pointer px-10 py-1 text-2xl font-bold"
            }
            onClick={() => {setCurrentState("login")}}
          >
            Log In
          </p>
          <p
            className={
              currentState == "signup"
                ? "bg-tomato font-body cursor-pointer px-10 py-1 text-2xl font-bold"
                : "bg-cream font-body cursor-pointer px-10 py-1 text-2xl font-bold"
            }
            onClick={() => {setCurrentState("signup")}}
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
