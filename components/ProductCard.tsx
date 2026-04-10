"use client"
import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import PriceView from './PriceView'
import AddToCart from './AddToCart'
import { Heart, Eye } from 'lucide-react'


const ProductCard = ({product}:{product:Product}) => {
  const [discountedPrice,setDiscountedPrice]= useState<number | null>(null);
  const isSale = product?.discount && product?.discount > 0;

  return (
    <div className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        {product?.image && (
          <Link href={`/product/${product?.slug?.current}`}>
              <Image 
                src={product?.image?.length > 0 ? urlFor(product?.image[0]).url() : "/fallback.png"} 
                fill
                alt={product?.name || 'Product Image'}
                className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
          </Link>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isSale && (
            <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              -{product.discount}% OFF
            </span>
          )}
          {product?.status === 'new' && (
            <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button className="p-2 bg-white text-darkColor rounded-full shadow-md hover:bg-darkColor hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <Link href={`/product/${product?.slug?.current}`} className="p-2 bg-white text-darkColor rounded-full shadow-md hover:bg-darkColor hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {product?.stock === 0 && (
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] flex items-center justify-center z-20">
            <p className="px-4 py-2 bg-white text-darkColor font-bold rounded-lg shadow-xl">Out of Stock</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {product?.variantType || 'Collection'}
          </p>
          <Link href={`/product/${product?.slug?.current}`}>
            <h2 className="font-bold text-darkColor line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product?.name}
            </h2>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-2">
          <PriceView 
            price={product?.price ?? 0} 
            discount={product?.discount ?? 0} 
            onPriceCalculated={setDiscountedPrice} 
            className="text-lg font-extrabold"
          />
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-zinc-400 font-medium">(4.8)</span>
          </div>
        </div>

        <AddToCart 
          product={product} 
          discountedPrice={discountedPrice ?? 0}
          className="mt-2"
        />
      </div>
    </div>
  )
}

export default ProductCard