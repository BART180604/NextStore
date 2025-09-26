"use client"

import { Category } from '@/sanity.types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const HeaderMenu = ({categories}:{categories:Category[]}) => {
  const pathname=usePathname();
  return (
  
    
    <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold cursor-pointer ">

      <Link href={"/"} className={`hover:text-darkColor hoverEffect relative group ${pathname==="/" && "text-darkColor"}`}>
       Home
       <span className={`absolute -bottom-0.5 left-2 w-0  bg-darkColor hoverEffect group-hover:w-1/2 h-0.5 group-hover:left-0 ${pathname === "/" && "w-1/2"}`}/>
       <span className={`absolute -bottom-0.5 right-2 w-0  bg-darkColor hoverEffect group-hover:w-1/2 h-0.5 group-hover:right-0 ${pathname === "/" && "w-1/2"}`}/>
      
      </Link>
      {categories?.map((category)=>(
        <Link key={category?._id} href={`/category/${category?.slug?.current}`} className={`hover:text-darkColor hoverEffect relative group ${pathname===`/category/${category?.slug?.current}` && 'text-darkColor'}`}>
          {category?.title}
          <span className={`absolute -bottom-0.5 left-2 w-0  bg-darkColor hoverEffect group-hover:w-1/2 h-0.5 group-hover:left-0 ${pathname === `/category/${category?.slug?.current}` && "w-1/2"}`}/>
          <span className={`absolute -bottom-0.5 right-2 w-0  bg-darkColor hoverEffect group-hover:w-1/2 h-0.5 group-hover:right-0 ${pathname === `/category/${category?.slug?.current}` && "w-1/2"}`}/>
      
        </Link>
      ))}
    </div>
  )
}

export default HeaderMenu