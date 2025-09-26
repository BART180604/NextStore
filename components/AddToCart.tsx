"use client";
import { Product } from '@/sanity.types';
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import QuantityButton from './QuantityButton';
import PriceFormat from './PriceFormat';
import useCartStore from '@/store';
import { toast } from 'sonner';

interface Props{
    product:Product;
    discountedPrice?:number;
    className?:string
}
const AddToCart = ({product,discountedPrice,className}:Props) => {
    const {addItem,getItemCount}=useCartStore()
    const isOutOfStock = product?.stock ===0;
    const itemCount = getItemCount(product._id);
  return (
    <div className='w-full h-12 flex items-center'>
        {itemCount ? (
          <div className="w-full text-sm">
            <div className="flex items-center justify-between">
              <span>Quantity</span>
              <QuantityButton product={product} />
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Subtotal :</span>

              {discountedPrice? (
                <PriceFormat amount={discountedPrice * itemCount} />
              ):(
                <PriceFormat amount={product?.price? product?.price*itemCount : 0} />
              )}
              

            </div>
          </div>
         
        ):(
          <Button 
            onClick={()=>{addItem(product);
              toast.success(`${product?.name?.substring(0,12)}... added suucessfully`)
            }}
            disabled={isOutOfStock} 
            className={cn("w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect ",className)}
          >
            Add to cart
          
          </Button>
        )}
    </div>
  )
}

export default AddToCart