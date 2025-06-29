'use client'
import React from 'react'
import {BsSearch,BsBell,BsChevronDown} from 'react-icons/bs';
import NavItems from './NavItems'
import AccountMenu from './AccountMenu';
import {useCallback} from "react";
const Navbar = () => {
    const [showAccountMenu, setShowAccountMenu] = React.useState(false);
    const [showBackground,setShowBackground] = React.useState(false);
    const TopOffest = 66;
    React.useEffect(()=>
    {
        const handleScroll = () =>
        {
            if(window.scrollY >= TopOffest)
            {
                setShowBackground(true);
            }
            else{
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll',handleScroll);
        return () =>
        {
            window.removeEventListener('scroll',handleScroll);
        }
    },[])
    const toggleAccountMenu= useCallback(()=>
    {
        setShowAccountMenu((current)=>!current);
    },[]);
  return (
    <nav className="w-full fixed z-40">
    <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90 ${showBackground ? 'bg-zinc-900 bg-opacity-90': ' ' }` } >
        <img className="h-4 lg:h-7" src='/images/logo.png' />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <NavItems label={"Home"}/>
            <NavItems label={"Series"}/>
            <NavItems label={"Films"}/>
            <NavItems label={"New & Popular"}/>
            <NavItems label={"My List"}/>
            <NavItems label={"Browse by languages"}/>
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
             <BsSearch/>  
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
             <BsBell/>  
            </div>
            <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden ">
                <img src="/images/ProfilesImage.avif" />

            </div>
            <BsChevronDown className="text-gray-200 hover:text-gray-300 cursor-pointer w-5 h-5" /> 
            <AccountMenu visible={showAccountMenu} />   
            </div>
        </div>
    </div>

    </nav>
  )
}

export default Navbar