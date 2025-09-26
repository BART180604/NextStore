"use client"
import { cn } from "@/lib/utils";
import PriceFormat from "./PriceFormat";
import { useEffect } from "react";

interface Props {
  price: number;
  discount: number;
  onPriceCalculated?:(calculatedPrice:number | null)=>void;
  className?: string;
}

const PriceView = ({price, discount, className,onPriceCalculated}: Props) => {
  const discountedPrice = discount !== 0 ? price - (discount * price) / 100 : null;

  //on remonte la valeur vers le parent

  useEffect(()=>{
    onPriceCalculated?.(discountedPrice)
  },[discountedPrice,onPriceCalculated])

  
  return (
    <div className="flex items-center gap-2">
      <PriceFormat 
        amount={price} 
        className={cn(
          "font-medium",
          discountedPrice ? "line-through text-zinc-500" : "", // Barré seulement si discount
          className
        )} 
      />
      {discountedPrice && (
        <PriceFormat amount={discountedPrice} />
      )}
    </div>
  );
};

export default PriceView;