"use client"
import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import PriceView from './PriceView'
import AddToCart from './AddToCart'


const ProductCard = ({product}:{product:Product}) => {

  const [discountedPrice,setDiscountedPrice]= useState<number | null>(null);
  return (
    <div className="rounded-lg group overflow-hidden ">
      <div className="bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200  relative ">
        {product?.image &&
          <Link href={`/product/${product?.slug?.current}`}>
              <Image 
                src={product?.image?.length > 0 ? urlFor(product?.image[0]).url() :"/fallback.png"} 
                width={500} 
                height={500} 
                alt='productImage'
                priority
                className={`w-full h-72 object-contain overflow-hidden  hoverEffect ${product?.stock!==0 && ("group-hover:scale-105") }`}
            />
          </Link>
        }
        {product?.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full flex bg-darkColor/40 items-center justify-center ">
            <p className="text-center text-xl font-semibold text-white">Out of stock</p>
          </div>
        )}

          
        
      </div>
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
        <h2 className='font-semibold line-clamp-1'>{product?.name}</h2>
        <p>{product?.intro}</p>
        <PriceView price={product?.price??0} discount={product?.discount??0} onPriceCalculated={setDiscountedPrice } />
        <AddToCart product={product}  discountedPrice={discountedPrice ??0}/>
      </div>
     
    </div>
  )
}

export default ProductCard