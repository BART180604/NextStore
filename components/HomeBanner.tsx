import React from 'react'
import Title from './Title'

const HomeBanner = () => {
  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
        <Title className='text-3xl md:text-4xl uppercase font-bold text-center'>Best Collection</Title>
        <p className="text-sm text-center fond-medium text-lightColor max-w-[480px]">Find everything you look for and shop the latest </p>
    </div>
  )
}

export default HomeBanner