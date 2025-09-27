import { defineQuery } from "next-sanity"
import { sanityFetch } from "../lib/live";
import { Category } from "@/sanity.types";
import { client } from "../lib/client";

export const getProductBySlug= async(slug:string)=>{
    const PRODUCT_BY_SLUG_QUERY =defineQuery(`*[_type =='product' && slug.current == $slug] | order(name asc) [0]`);

    try {
        const product = await sanityFetch(
            {
                query:PRODUCT_BY_SLUG_QUERY,
                params:{
                    slug,
                }

            }
        );
        return product?.data || null;
    } catch (error) {
        console.error("Error fetching product by Slug: ",error)
    }
}




// Fonction serveur
export const getAllCategories = async (): Promise<Category[]> => {
  const query = defineQuery(`*[_type=='category'] | order(title asc)`)
  try {
    const categories = await sanityFetch({ query })
    return categories?.data || []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export const getMyOrders = async (userId: string) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    
    const MY_ORDERS_QUERY = defineQuery(`*[_type=="order" && clerkUserId==$userId] | order(orderDate desc){
        ...,
        products[]{
            ...,
            product->
        }
    }`);
    
    try {
        const orders = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params: { userId }
        });
        return orders?.data || [];
    } catch (error) {
        console.error("Error fetching orders:", error);
        return []; // Return empty array instead of undefined
    }
};


export const getAllCategoriesClient = async (): Promise<Category[]> => {
  return await client.fetch(`*[_type == "category"]{
    _id,
    title,
    slug,
    description
  }`)
}