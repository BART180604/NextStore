import React from 'react'
import Container from './Container'
import FooterTop from './FooterTop'
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { Input } from './ui/input'
import { categoriesData, quickLinks } from '@/constants'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-white border-top'>
      <Container>
        <FooterTop />
        <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8 '>
          <div className='space-y-4'>
            <Logo>Ghost</Logo>
            <p className='text-gray-600 text-sm '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam accusantium provident, unde similique doloremque aut reprehenderit omnis ab perferendis impedit. Quibusdam saepe fugit aperiam vero distinctio nam porro. Laudantium, fuga!</p>
            <SocialMedia className='text-darkColor/60' iconClassName='border-darkColor/60 hover:border-darkColor hover:text-darkColor hoverEffect' tooltipClassName='bg-darkColor text-white'/>
          </div>
          <div className=" ">
            <h3 className="font-semibold text-darkColor mb-4">Quick Links</h3>
              <div className="flex flex-col gap-3">
                {quickLinks?.map((item)=>(
                 <Link href={item?.href} key={item?.title} className='text-gray-600 hover:text-darkColor font-medium text-sm hoverEffect' >{item?.title}</Link>
               ))}
              </div>
          </div>
          <div>
             <h3 className="font-semibold text-darkColor mb-4">Categories</h3>
              <div className="flex flex-col gap-3">
                {categoriesData?.map((item)=>(
                 <Link href={`/category${item?.href}`} key={item?.title} className='text-gray-600 hover:text-darkColor font-medium text-sm hoverEffect' >{item?.title}</Link>
               ))}
              </div>
          </div>
          <div>

            <h3 className="font-semibold text-darkColor mb-4">Newsletter</h3>
            <p className='text-gray-600 text-sm mb-4'>Subscribe to our newsletter to receive updates and exclusive offers</p>
            <form className="space-y-3">
              <Input type="email" placeholder='Enter your email' required className="w-full px-4 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"/>
              <button type="submit" className='w-full bg-darkColor text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors hover-Effect cursor-pointer'>Subscribe</button >
            </form>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer