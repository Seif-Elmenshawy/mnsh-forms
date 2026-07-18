import logo from "../../../assets/Logo.png";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

const MotionLink = motion.create(Link);

interface prop {
  current: string;
}

const Nav = ({ current }: prop) => {
  return (
    <div className="bg-burnt-orange brutal-shadow border-ink mx-5 flex w-[calc(100%-2.5rem)] items-center justify-between border-8 px-4 py-2.5">
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
        <MotionLink
          whileTap={{
            x:4,
            y:4
        }}
          transition={{duration:0.15}}
          className="brutal-border-sharp bg-maroon text-cream flex w-fit flex-row items-center justify-center gap-2.5 px-5 py-3"
          to="/"
        >
          Create <PlusIcon className="h-6 w-6" />
        </MotionLink>
      </div>
    </div>
  );
};

export default Nav;
