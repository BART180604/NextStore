"use client";
import { Product } from '@/sanity.types';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import QuantityButton from './QuantityButton';
import PriceFormat from './PriceFormat';
import useCartStore from '@/store';
import { toast } from 'sonner';

interface Props{
    product: Product;
    discountedPrice?: number;
    className?: string;
}

const AddToCart = ({product, discountedPrice, className}: Props) => {
    const { addItem, getItemCount } = useCartStore();
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
    const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

    const isOutOfStock = product?.stock === 0;
    const itemCount = getItemCount(product._id, selectedColor, selectedSize);

    // Vérifier si toutes les options nécessaires sont sélectionnées
    const hasColors = product?.colors && product.colors.length > 0;
    const hasSizes = product?.sizes && product.sizes.length > 0;
    const canAddToCart = (!hasColors || selectedColor) && (!hasSizes || selectedSize);

    const handleAddToCart = () => {
      if (!canAddToCart) {
        toast.error("Please select all options (Color/Size)");
        return;
      }
      addItem(product, selectedColor, selectedSize);
      toast.success(`${product?.name?.substring(0, 12)}... added successfully`);
    };

    return (
        <div className='w-full flex flex-col gap-4'>
            {/* Sélection des variantes si elles existent */}
            <div className="flex flex-col gap-3">
                {hasColors && (
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase text-gray-500">Color</span>
                        <div className="flex flex-wrap gap-2">
                            {product.colors?.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={cn(
                                        "px-3 py-1 text-xs border rounded-full hoverEffect",
                                        selectedColor === color ? "bg-darkColor text-white border-darkColor" : "bg-white text-darkColor border-gray-300"
                                    )}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {hasSizes && (
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase text-gray-500">Size</span>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes?.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                        "px-3 py-1 text-xs border rounded-full hoverEffect",
                                        selectedSize === size ? "bg-darkColor text-white border-darkColor" : "bg-white text-darkColor border-gray-300"
                                    )}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className='w-full h-12 flex items-center mt-2'>
                {itemCount ? (
                    <div className="w-full text-sm">
                        <div className="flex items-center justify-between">
                            <span>Quantity</span>
                            <QuantityButton 
                              product={product} 
                              selectedColor={selectedColor} 
                              selectedSize={selectedSize} 
                            />
                        </div>
                        <div className='flex justify-between mt-1'>
                            <span className='font-semibold'>Subtotal:</span>
                            {discountedPrice ? (
                                <PriceFormat amount={discountedPrice * itemCount} />
                            ) : (
                                <PriceFormat amount={product?.price ? product?.price * itemCount : 0} />
                            )}
                        </div>
                    </div>
                ) : (
                    <Button 
                        onClick={handleAddToCart}
                        disabled={isOutOfStock || !canAddToCart} 
                        className={cn(
                            "w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect",
                            !canAddToCart && "opacity-50 cursor-not-allowed",
                            className
                        )}
                    >
                        {isOutOfStock ? "Out of Stock" : !canAddToCart ? "Select Options" : "Add to cart"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddToCart;