"use client"

import { Search, X } from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { client } from "@/sanity/lib/client"
import { Product } from "@/sanity.types"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import PriceView from "./PriceView"
import AddToCart from "./AddToCart"

const SearchBar = () => {
  const [search, setSearch] = useState("") // texte tapé par l'utilisateur
  const [products, setProducts] = useState<Product[]>([]) // liste des produits trouvés
  const [loading, setLoading] = useState(false) // indicateur de chargement
  const [showSearch, setShowSearch] = useState(false) // contrôle ouverture/fermeture du modal

  // fonction de recherche des produits
  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([])
      return
    }

    setLoading(true)
    try {
      const query = `*[_type=="product" && name match $search] | order(name asc)`
      const params = { search: `${search}*` } // recherche avec wildcard
      const response = await client.fetch(query, params)
      setProducts(response)
    } catch (error) {
      console.error("Error fetching products: ", error)
    } finally {
      setLoading(false)
    }
  }, [search])

  // debounce de 300ms sur la recherche
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [search, fetchProducts])

  return (
    <Dialog open={showSearch} onOpenChange={(open) => setShowSearch(open)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>

      <DialogContent className="max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Product SearchBar</DialogTitle>

          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search your product here ..."
              className="flex-1 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <X
                className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect"
                onClick={() => setSearch("")}
              />
            )}

            <button
              type="submit"
              className={`absolute right-0 top-0 w-10 h-full flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-darkColor hover:text-white hoverEffect ${
                search ? "bg-darkColor text-white" : "bg-darkColor/10"
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>

        <div className="w-full h-full overflow-y-scroll border border-darkColor/20 rounded-md">
          <div>
            {loading ? (
              <p>Searching in progress...</p>
            ) : products.length ? (
              products.map((product: Product) => (
                <div
                  key={product?._id}
                  className="bg-white overflow-hidden border-b last:border-b-0"
                >
                  <div className="flex items-center p-1">
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 border border-darkColor/20 group rounded-md overflow-hidden"
                      onClick={() => setShowSearch(false)}
                    >
                      {product?.image && (
                        <Image
                          src={urlFor(product?.image[0]).url()}
                          width={200}
                          height={200}
                          alt="product Image"
                          priority
                          className="w-full h object-cover group-hover:scale-110 hoverEffect"
                        />
                      )}
                    </Link>

                    <div className="px-4 py-2 flex-grow">
                      <Link
                        href={`/product/${product?.slug?.current}`}
                        onClick={() => setShowSearch(false)}
                      >
                        <h3 className="text-sm font-semibold md:text-lg text-gray-800 line-clamp-1">
                          {product?.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {product?.intro}
                        </p>
                      </Link>

                      <PriceView
                        price={product?.price ??0}
                        discount={product?.discount??0}
                        className="md:text-lg"
                      />
                    </div>

                    <div className="mt-1">
                      <AddToCart product={product} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 font-semibold tracking-wide">
                {search && !products?.length ? (
                  <p>Nothing matching</p>
                ) : (
                  <p className="text-green-600 flex items-center justify-center gap-1">
                    <Search className="w-5 h-5" /> Search and explore your
                    products from Ghost
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar
