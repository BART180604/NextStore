"use client"
import Container from '@/components/Container';
import EmptyCart from '@/components/EmptyCart';
import Loading from '@/components/Loading';
import NoAccessToCart from '@/components/NoAccessToCart';
import PriceFormat from '@/components/PriceFormat';
import PriceView from '@/components/PriceView';
import QuantityButton from '@/components/QuantityButton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipProvider, TooltipTrigger,TooltipContent } from '@/components/ui/tooltip';
import { urlFor } from '@/sanity/lib/image';
import useCartStore from '@/store';
import { useAuth, useUser } from '@clerk/nextjs';
import { Heart, ShoppingBag, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import paypalLogo from "@/images/paypalLogo.png"
import { createCheckoutSession, Metadata } from '@/actions/createCheckoutSession';


const CartPage = () => {

  const [isClient,setIsClient]=useState(false);
  const[loading,setLoading]=useState(false);
  const {getGroupedItems,getTotalPrice,getItemCount,getSubtotalPrice,resetCart,removeItem}=useCartStore();
  const {isSignedIn}=useAuth();
  const {user} = useUser()

  useEffect(()=>{
    setIsClient(true)
  },[]);

  if(!isClient){
   return <Loading />
  }

  const cartProducts=getGroupedItems();
  
  if (cartProducts.length === 0 && isSignedIn) {
    return <EmptyCart />
  }

  const handleReset = () =>{
    const confirmed = window.confirm("Are you sure to reset your cart🫣?");
    if(confirmed){
      resetCart()
      toast.success("Your cart reset successfully!")
    }
  }

  const handleCheckout=async()=>{
    setLoading(true);
    try {
      const metadata:Metadata={
        orderNumber:crypto.randomUUID(),
        customerName:user?.fullName ?? "Unknown",
        customerEmail:user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId:user!.id

      }
      const checkoutUrl= await createCheckoutSession(cartProducts,metadata);
      if(checkoutUrl){
        window.location.href=checkoutUrl
      }
    } catch (error) {
      console.error("Error creating checkout session:",error)
      toast.error("Checkout failed. Please try again.")
    }finally{
      setLoading(false)
    }
  }
  return (
    
<div className='bg-gray-50 pb-52 md:pb-10 min-h-screen'>

  {isSignedIn ? (
    <Container>
      <div className="flex items-center gap-2 py-5">
        <ShoppingBag />
        <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 md:gap-8">
        <div className="lg:col-span-2 rounded-lg">
          <div className='border bg-white rounded-md'>
            {cartProducts?.map((item) => {
              const { product, selectedColor, selectedSize } = item;
              const itemCount = getItemCount(product?._id, selectedColor, selectedSize);
              const price = product?.price ?? 0;
              const discount = product?.discount ?? 0;
              const finalPrice = discount
                ? (price - (discount * price) / 100) * itemCount
                : itemCount * price;

              return (
                <div key={`${product?._id}-${selectedColor}-${selectedSize}`} className='border-b p-4 last:border-b-0 flex flex-col md:flex-row items-center justify-between gap-5 '>
                  <div className="flex flex-1 items-center gap-4 w-full">
                    {product?.image && (
                      <Link href={`/product/${product?.slug?.current}`} className='border p-1 group shrink-0'>
                        <Image 
                          src={urlFor(product?.image[0]).url()}
                          alt="productImage"
                          width={150}
                          height={150}
                          className='w-24 h-24 md:w-32 md:h-32 object-cover group-hover:scale-105 transition-transform'
                        />
                      </Link>
                    )}

                    <div className="flex-1 flex flex-col justify-between py-1 min-h-[100px]">
                      <div className="space-y-1">
                        <h2 className='font-bold text-base md:text-lg line-clamp-1'>{product?.name}</h2>
                        <div className='flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600'>
                          {selectedColor && (
                            <p>Color: <span className='font-semibold text-darkColor'>{selectedColor}</span></p>
                          )}
                          {selectedSize && (
                            <p>Size: <span className='font-semibold text-darkColor'>{selectedSize}</span></p>
                          )}
                        </div>
                        <p className='text-xs text-gray-400 capitalize'>Status: {product?.status}</p>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className='hover:text-green-600 transition-colors'>
                                <Heart className='w-5 h-5' />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Add to favorites</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button 
                                onClick={() => { 
                                  removeItem(product?._id, selectedColor, selectedSize); 
                                  toast.success(`${product?.name} removed`) 
                                }}
                                className='hover:text-red-600 transition-colors'
                              >
                                <Trash className='w-5 h-5' />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className='bg-red-600 text-white'>Remove item</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                    <div className='text-right'>
                      <PriceView price={price} discount={discount} className='font-bold text-lg text-darkColor'/>
                      <p className="text-xs text-gray-500 mt-1">Subtotal: <PriceFormat amount={finalPrice} /></p>
                    </div>
                    <QuantityButton product={product} selectedColor={selectedColor} selectedSize={selectedSize} />
                  </div>
                </div>
              )
            })}

            <div className='p-4 border-t bg-gray-50/50 flex justify-between items-center'>
               <Button onClick={handleReset} variant="outline" size="sm" className='text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-semibold'>
                 Reset Cart
               </Button>
               <p className='text-sm text-gray-500'>{cartProducts.length} unique items in cart</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="sticky top-24 bg-white p-6 rounded-lg border shadow-sm">
            <h2 className='text-xl font-bold mb-6'>Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <PriceFormat amount={getSubtotalPrice()} />
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <PriceFormat amount={getSubtotalPrice() - getTotalPrice()} />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className='font-bold text-lg'>Total</span>
                <PriceFormat amount={getTotalPrice()} className='text-2xl font-bold text-darkColor'/>
              </div>
              
              <Button 
                onClick={handleCheckout} 
                disabled={loading}
                className='w-full rounded-full font-bold h-12 text-base mt-4'
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </Button>
              
              <div className='flex flex-col items-center gap-2 mt-4'>
                <p className='text-xs text-gray-400'>Secure payment powered by</p>
                <Image src={paypalLogo} alt="paypalLogo" className='w-24 grayscale opacity-70'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  ) : (
    <NoAccessToCart />
  )}
</div>
  )
}

export default CartPage;