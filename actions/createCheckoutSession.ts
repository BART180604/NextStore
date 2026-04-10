"use server"
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata{
    orderNumber:string;
    customerName:string;
    customerEmail:string;
    clerkUserId:string;
}

export async function createCheckoutSession(items:CartItem[],metadata:Metadata){

    try {
        const customers = await stripe.customers.list({
            email:metadata?.customerEmail,
            limit:1,
        });
        const customerId=customers.data.length > 0 ? customers.data[0].id :"";

        const sessionPayload:Stripe.Checkout.SessionCreateParams={
            metadata:{
                orderNumber:metadata?.orderNumber,     
                customerName:metadata?.customerName,
                customerEmail:metadata?.customerEmail,
                clerkUserId:metadata?.clerkUserId
            },
            mode:"payment",
            allow_promotion_codes:true,
            payment_method_types:["card"],
            invoice_creation:{
                enabled:true,
            },
            success_url:`${process.env.PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata?.orderNumber}`,
            cancel_url:`${process.env.PUBLIC_BASE_URL}/cart`,

            line_items:items.map((item)=>{
                const variantString = [item.selectedColor, item.selectedSize].filter(Boolean).join(" / ");
                
                return {
                    price_data:{
                        currency:"USD",
                        unit_amount:Math.round(item?.product?.discount? (item.product.price!*(1- (item?.product?.discount ?? 0)/100) * 100): item?.product?.price ??0 * 100),
                        product_data:{
                            name: item.product.name + (variantString ? ` (${variantString})` : ""),
                            description: item.product.description,
                            metadata:{
                                id: item.product._id,
                                color: item.selectedColor || "",
                                size: item.selectedSize || ""
                            },
                            images:item.product.image && item.product.image.length > 0 ? [urlFor(item.product.image[0]).url()] : undefined
                        }
                    },
                    quantity:item.quantity,
                }
            })
        };

        if(customerId){
            sessionPayload.customer=customerId;
        }else{
            sessionPayload.customer_email = metadata.customerEmail;
        }

        const session=await stripe.checkout.sessions.create(sessionPayload);
        return session.url;
    } catch (error) {
        console.error("Error creating checkout session:",error)
    }
}