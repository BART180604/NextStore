"use server"
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

//Metadata → structure pour stocker des informations sur la commande et le client (numéro de commande, nom, email, id utilisateur provenant de Clerk).
export interface Metadata{
    orderNumber:string;
    customerName:string;
    customerEmail:string;
    clerkUserId:string;

}

//CartItems → structure représentant un produit du panier (produit + quantité).


export async function createCheckoutSession(items:CartItem[],metadata:Metadata){

    try {
        //4. Vérifier si le client existe déjà chez Stripe
        //Avantage : un client qui repaye avec le même email aura un historique propre (pas 10 clients doublons).
    const customers = await stripe.customers.list({
        email:metadata?.customerEmail,
        limit:1,  //on prend le premier
    });
    const customerId=customers.data.length > 0 ? customers.data[0].id :"";  //si trouvé on réupère l'id

    //5. Préparer les données pour Stripe Checkout
    const sessionPayload:Stripe.Checkout.SessionCreateParams={

        //information stocké dans stripe
        metadata:{
            orderNumber:metadata?.orderNumber,     
            customerName:metadata?.customerName,
            customerEmail:metadata?.customerEmail,
            clerkUserId:metadata?.clerkUserId

        },
        mode:"payment",  //mode simple ,payment direct
        allow_promotion_codes:true,   //autorise l'usage des codes promo
        payment_method_types:["card"], //uniquement paiement par carte
        invoice_creation:{
            enabled:true,  //stripe peut générer une facture
        },

        //📌 6. Définir les URLs de redirection
        success_url:`${process.env.PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata?.orderNumber}`,
        cancel_url:`${process.env.PUBLIC_BASE_URL}/cart`,

        //7. Définir les articles à payer
        line_items:items.map((item)=>({
           

            price_data:{
                currency:"USD",
                unit_amount:Math.round(item?.product?.discount? (item.product.price!*(1- (item?.product?.discount ?? 0)/100) * 100):item?.product?.price * 100),
                product_data:{
                    name:item.product.name || "Unamed Product",
                    description:item.product.description,
                    metadata:{id:item.product._id},
                    images:item.product.image && item.product.image.length > 0 ? [urlFor(item.product.image[0]).url()] : undefined
                }
            },
            quantity:item.quantity,
        }))


    };

    //📌 8. Associer le client à la session
    if(customerId){
        sessionPayload.customer=customerId;

    }else{
        sessionPayload.customer_email = metadata.customerEmail;
    }

    //📌 9. Créer la session Checkout
    const session=await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
    } catch (error) {
        console.error("Error creating checkout session:",error)
    }
}