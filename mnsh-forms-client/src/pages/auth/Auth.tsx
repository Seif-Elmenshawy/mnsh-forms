import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Auth = () => {
  const [currentState, setCurrentState] = useState("login");
  const [focused, setFocused] = useState("");
  return (
    <div className="flex h-screen w-screen items-start justify-center pt-32">
      <div className="bg-burnt-orange brutal-shadow brutal-border-sharp h- flex flex-col items-center justify-center px-15 py-7">
        <h2 className="font-heading text-5xl font-bold">Welcome</h2>
        <div className="brutal-border-sharp bg-cream flex flex-row">
          <motion.p
            initial={{
              backgroundColor: "#FF8FA3",
            }}
            animate={{
              backgroundColor: currentState == "login" ? "#FF8FA3" : "#FFF3E9",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 70 }}
            className="font-body relative cursor-pointer px-10 py-1 text-2xl font-bold"
            onClick={() => {
              setCurrentState("login");
            }}
          >
            Log In
          </motion.p>
          <motion.p
            initial={{
              backgroundColor: "#FFF3E9",
            }}
            animate={{
              backgroundColor: currentState == "signup" ? "#FF8FA3" : "#FFF3E9",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 70 }}
            className="font-body relative cursor-pointer px-10 py-1 text-2xl font-bold"
            onClick={() => {
              setCurrentState("signup");
            }}
          >
            Sign Up
          </motion.p>
        </div>

        <div className="py-10">
          <form
            id="login"
            className={
              currentState == "login"
                ? "flex flex-col justify-center items-center"
                : "hidden"
            }
          >
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="login-email">Email</label>
              <motion.input
                type="email"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="login-email"
                id="login-email"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body mb-6 w-sm px-6 py-2 text-lg focus:outline-none"
                placeholder="example@gmail.com"
              />
              <label htmlFor="login-password">Password</label>
              <motion.input
                type="password"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="login-password"
                id="login-password"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body mb-6 w-sm px-3 py-1.5 text-lg focus:outline-none"
              />
            </div>
            <motion.button
              className="bg-tomato brutal-border-sharp font-body w-fit px-5 py-2.5 text-xl font-bold"
              whileTap={{
                x: 4,
                y: 4,
              }}
              transition={{ duration: 0.15 }}
            >
              Log In
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
