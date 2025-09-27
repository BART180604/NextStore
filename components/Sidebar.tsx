import React from 'react'
import { motion } from "motion/react"
import Logo from './Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { X } from 'lucide-react';
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Category } from '@/sanity.types';
interface SidebarProps{
    isOpen: boolean;
    categories:Category[]
    onClose: ()=>void;
    
}
const Sidebar= ({isOpen,onClose,categories}:SidebarProps) => {
  const pathname=usePathname();
  
  const sidebarRef=useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div className={`fixed inset-y-0 bg-darkColor/50 left-0 z-50 shadow-xl hoverEffect cursor-auto w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}>
        <motion.div 
            className='min-w-72 max-w-96 bg-darkColor border-r flex flex-col gap-6 border-r-white h-full p-10 text-white/90'
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.4,delay:0.3}}
            ref={sidebarRef}
        >
            <div className="flex items-center justify-between">

                <button onClick={onClose}>
                    <Logo className='text-white/90 h-full'>Ghost</Logo>
                </button>
                <button className='hover:text-red-500 hoverEffect' onClick={onClose}>
                    <X className='h-6 w-7'/>
                </button>

            </div>
            <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide ">
                <Link href={"/"} className={`hover:text-white hover:bg-gray-800 hoverEffect relative group ${pathname==="/" && "text-darkBlue"}`}>Home</Link>
                {categories?.length? categories?.map((category)=>(
                    <Link key={category?._id} href={`/category/${category?.slug?.current}`} className={`hover:text-white hover:bg-gray-800 hoverEffect relative group ${pathname===`/category/${category?.slug?.current}`? 'text-darkBlue':''}`}>
                    {category?.title}
                    
                    </Link>
                )): <p>No categories found</p> }
            </div>  
            <SocialMedia />
        </motion.div>
    </div>
  )
}

export default Sidebar