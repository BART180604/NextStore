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
import { metadata } from '../../studio/layout';
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
  const handleReset = () =>{
    const confirmed = window.confirm("Are you sure to reset your cart🫣?");
    if(confirmed){
      resetCart()
      toast.success("Your cart reset successfully!")
    }
    toast.success("Cart reset cancelled.😮‍💨")
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
    }finally{
      setLoading(false)
    }
  }
  return (
<div className='bg-gray-50 pb-52 md:pb-10'>

  {/* Vérification si utilisateur connecté */}
  {isSignedIn ? (

    <Container>

      {/* Header du panier */}
      <div className="flex items-center gap-2 py-5">
        <ShoppingBag />
        <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 md:gap-8">

        {/* ------------------ Section Produits ------------------ */}
        <div className="lg:col-span-2 rounded-lg">
          <div className='border bg-white rounded-md'>

            {/* Liste des produits */}
            {cartProducts?.map(({ product }) => {
              const itemCount = getItemCount(product?._id)
              const price = product?.price ?? 0
              const finalPrice = product?.discount
                ? (price - (product?.discount * price) / 100) * itemCount
                : itemCount * price

              return (
                <div key={product?._id} className='border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5 '>

                  {/* Image + infos produit */}
                  <div className="flex flex-1 items-center gap-2 h-36 md:h-44">
                    
                    {/* Image */}
                    {product?.image && (
                      <Link href={`/product/${product?.slug?.current}`} className='border p-0.5 md:p-1 mr-2 group'>
                        <Image 
                          src={urlFor(product?.image[0]).url()}
                          alt="productImage"
                          width={500}
                          height={500}
                          loading="lazy"
                          className='w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect'
                        />
                      </Link>
                    )}

                    {/* Infos texte */}
                    <div className="h-full flex flex-1 items-start flex-col justify-between py-1 ">
                      <div className="space-y-1.5">
                        <h2 className='font-semibold line-clamp-1'>{product?.name}</h2>
                        <p className='text-lightColor font-medium text-sm '>{product?.intro}</p>
                        <p className='text-sm capitalize '>Variants: <span className='font-semibold'>{product?.variants}</span></p>
                        <p className='text-sm capitalize'> Status: <span className='font-semibold'>{product?.status}</span></p>
                      </div>

                      {/* Icons */}
                      <div className="text-gray-500 flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Heart className='w-4 h-4 md:w-5 md:h-5 hover:text-green-500' />
                            </TooltipTrigger>
                            <TooltipContent className='font-bold'>
                              Add to favorite
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Trash 
                                onClick={() => { removeItem(product?._id); toast.success(`${product?.name} removed successfully from your cart`) }}
                                className='w-4 h-4 md:w-5 md:h-5 hover:text-red-500' 
                              />
                            </TooltipTrigger>
                            <TooltipContent className='font-bold bg-red-600'>
                              Delete from cart
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {/* Prix + quantité */}
                    <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                      <PriceView price={product?.price} discount={product?.discount} className='font-bold text-lg'/>
                      <p className="text-sm text-gray-500">Total: <PriceFormat amount={finalPrice} /></p>
                      <QuantityButton product={product} />
                    </div>

                  </div>
                </div>
              )
            })}

            {/* Bouton reset */}
            <Button onClick={() => handleReset()} className='m-5 font-semibold' variant="destructive">Reset Cart</Button>

          </div>
        </div>

        {/* ------------------ Section Résumé ------------------ */}
        <div className="lg:col-span-1">

          {/* Résumé pour desktop */}
          <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
            <h2 className='text-xl'>Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <PriceFormat amount={getSubtotalPrice()} />
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <PriceFormat amount={getSubtotalPrice() - getTotalPrice()} />
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total</span>
                <PriceFormat amount={getSubtotalPrice()} className='text-lg font-bold text-black'/>
              </div>
              <Button onClick={handleCheckout} className='w-full rounded-full font-semibold tracking-wide' size="lg">Proceed to Checkout</Button>
              <Link href={"/"} className='flex items-center justify-center py-2 border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/50 hoverEffect'>
                <Image src={paypalLogo} alt="paypalLogo" className='w-20'/>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* ------------------ Section résumé mobile ------------------ */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
        <div className="p-4 rounded-lg border mx-4">
          <h2 className='text-xl'>Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <PriceFormat amount={getSubtotalPrice()} />
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <PriceFormat amount={getSubtotalPrice() - getTotalPrice()} />
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Total</span>
              <PriceFormat amount={getSubtotalPrice()} className='text-lg font-bold text-black'/>
            </div>
            <Button onClick={handleCheckout} className='w-full rounded-full font-semibold tracking-wide' size="lg">Proceed to Checkout</Button>
            <Link href={"/"} className='flex items-center justify-center py-2 border border-darkColor/50  rounded-full hover:border-darkColor hover:bg-darkColor/50 hoverEffect'>
              <Image src={paypalLogo} alt="paypalLogo" className='w-20'/>
            </Link>
          </div>
        </div>
      </div>

    </Container>

  ) : (
    cartProducts?.length ? <EmptyCart /> : <NoAccessToCart />
  )}

</div>

  )
}

export default CartPage