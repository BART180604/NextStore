import Container from '@/components/Container'
import HeroBanner from '@/components/HeroBanner'
import ProductsGrid from '@/components/ProductsGrid'
import BrandTrust from '@/components/BrandTrust'
import React from 'react'

const page = () => {
  return (
    <div className="space-y-16">
      <Container className='py-5'>
        <HeroBanner />
      </Container>

      <BrandTrust />

      <Container className='pb-20'>
        <div className="flex flex-col items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold text-darkColor">Trending Products</h2>
          <p className="text-gray-500 text-center max-w-md">Discover our most popular items, handpicked for their quality and style.</p>
        </div>
        <ProductsGrid />
      </Container>
    </div>
  )
}

export default page