import React from 'react'
import Logo from './Logo'
import {motion} from "motion/react"
import { Loader } from 'lucide-react'
const Loading = () => {
  return (
    <div className='flex items-center w-full fixed justify-center bg-white left-0 top-0 min-h-screen '>
        <div className='flex flex-col gap-1 justify-center items-center'>
            <Logo>Ghost</Logo>
            <motion.div  animate={{scale:[1,1.1,1]}} transition={{duration:1.5, repeat:Infinity}} className='flex space-x-2 items-center justify-center text-green-800'>
                <Loader className='animate-spin' />
                <span className='font-semibold tracking-wide'>Ghost Loading...</span>
            </motion.div>
        </div>
    </div>
  )
}

export default Loading