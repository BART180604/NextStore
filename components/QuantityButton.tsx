import { Minus, Plus } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import useCartStore from '@/store';
import { Product } from '@/sanity.types';
import { toast } from 'sonner';


interface Props{
  product:Product;
  className ?: string;
  selectedColor?: string;
  selectedSize?: string;
}
const QuantityButton = ({product, className, selectedColor, selectedSize}:Props) => {
  const {addItem, decreaseItem, getItemCount}= useCartStore()
  const quantity = getItemCount(product._id, selectedColor, selectedSize);

  return (
    <div className={cn("flex items-center justify-between pb-1 gap-1",className)}>
      <Button 

        onClick={()=>{
          decreaseItem(product._id, selectedColor, selectedSize);
          const newQuantity = getItemCount(product._id, selectedColor, selectedSize);
              
          toast.success(
            `${product?.name?.substring(0,12)}... ${newQuantity === 0 ? 'removed' : 'decreased'} successfully`
          );
        }}
        
        variant="outline" 
        size="icon" 
        className='w-6 h-6 cursor-pointer'
      >
        <Minus className="w-3 h-3" />
      </Button>
      <span className="font-semibold text-center text-darkColor w-8">{quantity}</span>
      <Button

        variant="outline" 
        size="icon" 
        className='w-6 h-6 cursor-pointer' 
        onClick={()=>{
          addItem(product, selectedColor, selectedSize);
          toast.success(`${product?.name?.substring(0,12)}... added successfully`)
        }}
        disabled={quantity === product.stock}
      >
        <Plus className="w-3 h-3" />
      </Button>

    </div>
  )
}

export default QuantityButton;