import React from 'react'
import logo from "../../../assets/Logo.png"
import { Link } from 'react-router-dom'

interface prop {
    current: string
}

const Nav = ({current}: prop) => {
  return (
    <div className='bg-burnt-orange flex justify-between  items-center w-[calc(100%-2.5rem)] py-2.5 px-4 mx-5 brutal-shadow border-ink border-8'>
        <div className='flex flex-row items-center'>
            <img className='w-20 h-20' src={logo} alt="Logo" />
            <h1 className='font-heading font-bold text-4xl'>MnsH Forms</h1>
        </div>
        <div className='flex flex-row gap-10 font-heading text-xl'>
            <Link className={current == "home" ? "font-bold" : ""} to="/dashboard">Home</Link>
            <Link className={current == "public" ? "font-bold" : ""} to="">Public forms</Link>
        </div>
    </div>
  )
}

export default Nav