"use client"
import React, { useEffect, useState } from 'react'
import HomeTabbar from './HomeTabbar'
import { productType } from '@/constants'
import { client } from '@/sanity/lib/client'
import { Product } from '@/sanity.types'
import ProductCard from './ProductCard'
import NoProductAvailable from './NoProductAvailable'
import { motion,AnimatePresence } from 'motion/react'
import ProductSkeleton from './ProductSkeleton'


const ProductsGrid = () => {
    const [selectedTab,setSelectedTab] = useState(productType[0]?.title || "");
    const [products,setProducts]= useState([]);
    const [loading,setLoading] = useState(false);
   const query = `*[_type == "product" && variants == $variants] | order(name asc)`;

    const params = { variants: selectedTab.toLowerCase()};
    useEffect(()=>{
      const fetchData=async()=>{
        setLoading(true);
        try {
          const response = await client.fetch(query,params);
          setProducts(await response)
        } catch (error) {
          console.log("Product fetching error", error);
        } finally{
          setLoading(false);
        }
      };
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedTab])
  return (
    <div className="mt-10 flex flex-col items-center  ">
        <HomeTabbar selectedTab={selectedTab} onTabSelect={(tab) => setSelectedTab(tab)} />
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full"> 
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ):(
          <>
            {products?.length? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full"> 
                {products?.map((product : Product)=>(
                  <AnimatePresence key={product?._id}>
                   <motion.div 
                      layout
                      initial={{opacity:0.2}}
                      animate={{opacity:1}}
                      exit={{opacity:0}} 
                    >
                       <ProductCard product={product} />
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            ):(
              <NoProductAvailable selectedTab={selectedTab} />
            )}
          </>
        )}
    </div>
  )
}

export default ProductsGrid