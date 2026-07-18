import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import FloatingDots from "../components/Floating-BG/Floating";

const server_url = import.meta.env.VITE_SERVER_API

const Auth = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("login");
  const [result, setResult] = useState({ ok: false, message: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const body = {
      email: formData.get("login-email"),
      password: formData.get("login-password"),
    };
    console.log(body);

    try {
      const response = await fetch(`${server_url}/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      setResult({ ok: response.ok, message: data.message });
      console.log(result);
      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const body = {
      userName: formData.get("signup-username"),
      email: formData.get("signup-email"),
      password: formData.get("signup-password"),
    };

    try {
      const response = await fetch(`${server_url}/user/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      setResult({ ok: response.ok, message: data.message });
      console.log(result);
      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="mb-10 flex h-screen w-screen items-start justify-center pt-32">
      <FloatingDots count = {150} />
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
            onSubmit={handleLogin}
            id="login"
            className={
              currentState == "login"
                ? "flex flex-col items-center justify-center"
                : "hidden"
            }
          >
            <div className="flex flex-col items-start justify-center">
              <label
                htmlFor="login-email"
                className="font-body text-lg font-bold"
              >
                Email
              </label>
              <motion.input
                type="email"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="login-email"
                id="login-email"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body mb-6 w-sm px-6 py-2 text-lg font-semibold focus:outline-none"
                placeholder="example@gmail.com"
                required
              />
              <label
                htmlFor="login-password"
                className="font-body text-lg font-bold"
              >
                Password
              </label>
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
                required
              />
            </div>
            <motion.button
              type="submit"
              className="bg-tomato brutal-border-sharp font-body w-fit px-5 py-2.5 text-xl font-bold"
              whileTap={{
                x: 4,
                y: 4,
              }}
              transition={{ duration: 0.15 }}
            >
              {loading ? (
                <motion.span
                  className="border-ink inline-block h-5 w-5 rounded-full border-2 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                ></motion.span>
              ) : (
                "Log In"
              )}
            </motion.button>
          </form>
          <form
            onSubmit={handleSignup}
            id="signup"
            className={
              currentState == "signup"
                ? "flex flex-col items-center justify-center"
                : "hidden"
            }
          >
            <div className="flex flex-col items-start justify-center">
              <label
                htmlFor="signup-username"
                className="font-body text-lg font-bold"
              >
                User Name
              </label>
              <motion.input
                type="text"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="signup-username"
                id="signup-username"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body mb-6 w-sm px-6 py-2 text-lg font-semibold focus:outline-none"
                placeholder="John Doe"
                required
              />
              <label
                htmlFor="signup-email"
                className="font-body text-lg font-bold"
              >
                Email
              </label>
              <motion.input
                type="email"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="signup-email"
                id="signup-email"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body mb-6 w-sm px-6 py-2 text-lg font-semibold focus:outline-none"
                placeholder="example@gmail.com"
                required
              />
              <label
                htmlFor="signup-password"
                className="font-body text-lg font-bold"
              >
                Password
              </label>
              <motion.input
                type="password"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="signup-password"
                id="signup-password"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body mb-6 w-sm px-3 py-1.5 text-lg focus:outline-none"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="bg-tomato brutal-border-sharp font-body w-fit px-5 py-2.5 text-xl font-bold"
              whileTap={{
                x: 4,
                y: 4,
              }}
              transition={{ duration: 0.15 }}
            >
              Sign Up
            </motion.button>
          </form>
        </div>
        <p
          className={
            result.ok
              ? "font-body text-xl font-bold text-green-800"
              : "font-body text-xl font-bold text-red-800"
          }
        >
          {result.message}
        </p>
      </div>
    </div>
  );
};

export default Auth;
