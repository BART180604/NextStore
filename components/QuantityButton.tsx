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
}
const QuantityButton = ({product,className}:Props) => {
  const {addItem,decreaseItem,getItemCount,removeItem}= useCartStore()
  const quantity=getItemCount(product._id);

  return (
    <div className={cn("flex items-center justify-between pb-1 gap-1",className)}>
      <Button 

        onClick={()=>{decreaseItem(product._id);
          //recupérer la quantité apres chaque clique
          const newQuantity= getItemCount(product._id)
              
            toast.success(
              `${product?.name?.substring(0,12)}... ${newQuantity === 0 ? 'removed successfully' : 'quantity decreased successfully'}`
            );

        }}
        
        variant="outline" 
        size="icon" 
        className='w-6 h-6 cursor-pointer'
      >
        <Minus />
      </Button>
      <span className="font-semibold text-center text-darkColor w-8">{quantity}</span>
      <Button

        variant="outline" 
        size="icon" 
        className='w-6 h-6 cursor-pointer' 
        onClick={()=>{addItem(product);
           toast.success(`${product?.name?.substring(0,12)}... add sucessfully`)
        }}
        disabled={quantity===product.stock}
      >
        <Plus />
      </Button>

    </div>
  )
}

export default QuantityButton