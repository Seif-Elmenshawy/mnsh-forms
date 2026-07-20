import logo from "../../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";


const serverUrl = import.meta.env.VITE_SERVER_API


interface prop {
  current: string;
}



const Nav = ({ current }: prop) => {
  const navigate = useNavigate()
  const handleFormCreation = async () => {
    try {
      const response = await fetch(`${serverUrl}/forms/create`, {
        method: "POST",
        credentials:"include",
        headers:{
            "Content-type": "application/json",
        }
      })
      const data = await response.json()
      navigate(`/forms/${data.data.id}/edit`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-burnt-orange brutal-shadow-nav brutal-border-heavy mx-5 flex w-[calc(100%-2.5rem)] items-center justify-between px-4 py-2.5">
      <div className="flex flex-row items-center">
        <img className="h-20 w-20" src={logo} alt="Logo" />
        <h1 className="font-heading text-4xl font-bold">MnsH Forms</h1>
      </div>
      <div className="font-heading flex flex-row items-center justify-center gap-10 text-xl">
        <Link className={current == "home" ? "font-bold" : ""} to="/dashboard">
          Home
        </Link>
        <Link className={current == "public" ? "font-bold" : ""} to="/">
          Public forms
        </Link>
        <motion.button
          whileTap={{
            x: 4,
            y: 4,
          }}
          transition={{ duration: 0.15 }}
          onClick={handleFormCreation}
          className="brutal-border-sharp bg-maroon text-cream flex w-fit flex-row items-center justify-center gap-2.5 px-5 py-3 cursor-pointer"
        >
          Create <PlusIcon className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default Nav;
