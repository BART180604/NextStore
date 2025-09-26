import AddToCart from '@/components/AddToCart';
import Container from '@/components/Container'
import ImageView from '@/components/ImageView';
import PriceView from '@/components/PriceView';
import ProductCaracteristics from '@/components/ProductCaracteristics';
import { getProductBySlug } from '@/sanity/helpers/query';
import { BoxIcon, FileQuestion, Heart, ListOrderedIcon, ShareIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{slug: string}>;
}) => {
  
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const price= product?.price ?? 0
  const dis=product?.discount ?? 0
  const discountedPrice= (price * dis)/100
  const finalPrice=price-discountedPrice;
   if (!product){
    return notFound();
   }
  
  

  return (
   
    <Container className="py-10 flex flex-col md:flex-row gap-10  ">
     <div>
        {/**Left */}
        {product?.image && 
          <ImageView image={product?.image}/>
        }
     </div>
      {/**Right*/}
      <div className="flex flex-col w-full gap-5">
        <div>
          <h2 className='text-3xl font-bold mb-2 md:text-4xl '>{product?.name}</h2>
          <PriceView price={product?.price} discount={product?.discount} className='text-lg font-bold' />
        </div>
        {product?.stock && <p className='bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semi-bold rounded-lg'>In Stock</p>}
        <p className='text-sm text-gray-600 tracking-wide'>{product?.description} </p>
        <div className="flex items-center gap-2.5 lg:gap-5">
          <AddToCart  product={product} className='bg-darkColor/80 w-full text-white hover:bg-darkColor hoverEffect rounded-md hover:border-darkColor hover:text-white ' discountedPrice={finalPrice} />
          <button className='border-2 border-darkColor /30 text-darkColor/60 px-6 py-1.5'>
            <Heart className="w-5 h-5"  />
          </button>
        </div>
        <ProductCaracteristics product={product} />
        <div className='flex flex-wrap justify-between items-center gap-2.5 border-b border-b-gray-200 py-5 mt-2'>
          <div className="text-sm flex items-center gap-2 text-black hover:text-red-600 hoverEffect" >
            <BoxIcon className='w-5 h-5' />
            <p>Compare Color</p>
          </div>
          <div className="text-sm flex items-center gap-2 text-black hover:text-red-600 hoverEffect" >
            <FileQuestion className='w-5 h-5' />
            <p>Ask a question</p>
          </div>
          <div className="text-sm flex items-center gap-2 text-black hover:text-red-600 hoverEffect" >
            <ListOrderedIcon className='w-5 h-5' />
            <p>Delivery & Return</p>
          </div>
          <div className="text-sm flex items-center gap-2 text-black hover:text-red-600 hoverEffect" >
            <ShareIcon className='w-5 h-5' />
            <p>Shared</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEffect">
            <p className='tect-base text-darkColor font-semibold'>Free shipping</p>
            <p className='text-sm text-gray-500'>Free shipping over order $120</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEffect">
            <p className='tect-base text-darkColor font-semibold'>Flexible Payment</p>
            <p className='text-sm text-gray-500'>Pay with multiple credits cards</p>
          </div>
        </div>
        
      </div>
    </Container>
    
  );
}

export default SingleProductPage