import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Auth = () => {
  const [currentState, setCurrentState] = useState("login");
  

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = {
      email: formData.get("login-email"),
      password: formData.get("login-password")
    }
    console.log(body)

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method:"POST",
        credentials:"include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = {
      userName: formData.get("signup-username"),
      email: formData.get("signup-email"),
      password: formData.get("signup-password")
    }

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method:"POST",
        credentials:"include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      console.log(data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex h-screen w-screen items-start justify-center pt-32 mb-10">
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
                ? "flex flex-col justify-center items-center"
                : "hidden"
            }
          >
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="login-email" className="font-bold font-body text-lg">Email</label>
              <motion.input
                type="email"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="login-email"
                id="login-email"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body font-semibold mb-6 w-sm px-6 py-2 text-lg focus:outline-none"
                placeholder="example@gmail.com"
                required
              />
              <label htmlFor="login-password" className="font-bold font-body text-lg">Password</label>
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
              Log In
            </motion.button>
          </form>
          <form
            onSubmit={handleSignup}
            id="signup"
            className={
              currentState == "signup"
                ? "flex flex-col justify-center items-center"
                : "hidden"
            }
          >
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="signup-username" className="font-bold font-body text-lg">User Name</label>
              <motion.input
                type="text"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="signup-username"
                id="signup-username"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body font-semibold mb-6 w-sm px-6 py-2 text-lg focus:outline-none"
                placeholder="John Doe"
                required
              />
              <label htmlFor="signup-email" className="font-bold font-body text-lg">Email</label>
              <motion.input
                type="email"
                initial={{
                  boxShadow: "0px 0px 0 #FF4C3B",
                }}
                whileFocus={{ boxShadow: "5px 5px 0px #FF4C3B" }}
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
                name="signup-email"
                id="signup-email"
                className="bg-cream brutal-border-slight brutal-shadow-accent font-body font-semibold mb-6 w-sm px-6 py-2 text-lg focus:outline-none"
                placeholder="example@gmail.com"
                required
              />
              <label htmlFor="signup-password" className="font-bold font-body text-lg">Password</label>
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
      </div>
    </div>
  );
};

export default Auth;
