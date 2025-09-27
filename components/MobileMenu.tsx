"use client"
import { AlignLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Category } from '@/sanity.types'

interface MobileMenuProps{
  categories:Category[]
}
const MobileMenu = ({categories}:MobileMenuProps) => {
  const [isSidebarOpen, setIsSidebarOpen]=useState(false)
  const [cats, setCats] = useState<Category[]>([])

  // On initialise l'état client avec les données serveur passées en prop
  useEffect(() => {
    setCats(categories)
  }, [categories])
  return (
   <>
     <button onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
        <AlignLeft className="hover:text-darkColor hoverEffect md:hidden "/>
     </button>
     <div className='md:hidden'>
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={()=>setIsSidebarOpen(false)}
        categories={cats}
        
      />
     </div>
   </>
  )
}

export default MobileMenu