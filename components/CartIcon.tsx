"use client"
import useCartStore from '@/store'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  const {items} = useCartStore()
  return(
    <Link href={"/cart"} className='group relative '>
        <ShoppingBag className='w-5 h-5 group-hover:text-darkColor hoverEffect' />
        <span className="absolute flex -top-2  -right-1 rounded-full bg-darkColor w-3.5 h-3.5 items-center justify-center text-xs text-white font-semibold">
          {items.length ? items.length : 0}
        </span>
    </Link>
  )
}

export default CartIcon