
import HeaderMenu from './HeaderMenu'
import Logo from './Logo'
import Container from './Container'
import MobileMenu from './MobileMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import React from 'react'
import { ClerkLoaded, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ListOrdered } from 'lucide-react'
import { getAllCategories, getMyOrders } from '@/sanity/helpers/query';
import { Category } from '@/sanity.types'
import { auth } from '@clerk/nextjs/server'


const Header = async () => {
  const {userId}=await auth();
  const categories:Category[] = await getAllCategories()
  let orders=null;
  if(userId){
    orders= await getMyOrders(userId);
  }
  return (
    <header className='py-4 border-b border-gray-300 sticky top-0 z-50 bg-white'>
        <Container className='flex items-center justify-between gap-7 text-lightColor'>
            {/**LeftBar */}
            <HeaderMenu categories={categories} />
            
            {/**Logo */}
            <div className="w-auto md:w-1/3 items-center flex justify-center gap-2.5">
                <MobileMenu />
                <Logo>Ghost</Logo>
            </div>
            
            {/**RightBar */}
            <div className="w-auto md:w-1/3 items-center flex justify-end gap-5">
                <SearchBar />
                <CartIcon />
                
                {/* User Auth */}
                <ClerkLoaded>
                  <SignedIn>
                    <Link href={"/orders"} className='group relative'>
                      <ListOrdered className='w-5 h-5 group-hover:text-darkColor hoverEffect' />
                      <span className="absolute flex -top-2 -right-1 rounded-full bg-darkColor w-3.5 h-3.5 items-center justify-center text-xs text-white font-semibold">
                        {orders?.length? orders?.length : 0}
                      </span>
                    </Link>
                    <UserButton />
                  </SignedIn>
                   
                  <SignedOut>
                    <SignInButton mode='modal'>
                      <button className='text-sm font-semibold hover:text-darkColor hoverEffect'>
                        Login
                      </button>
                    </SignInButton>
                  </SignedOut>
                </ClerkLoaded>
            </div>
        </Container>
    </header>
  )
}

export default Header