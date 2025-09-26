import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

//Structure declarative avec métadonnées ui
export const productType = defineType({
  name: "product", //Identifiant technique
  title: "Product",// Nom affiché dans l'UI
  type: "document",//Type de base Sanity
  icon: TrolleyIcon, // icon dans l'interface
  fields: [
    defineField({
      name: "name",
      title:"Product Name",
      type: "string",
        validation:(Rule)=>Rule.required()
    }),
    defineField({
        name:"slug",
        title:"Slug",
        type:"slug",
        options:{
            source:"name",
            maxLength:96,
        },
        validation:(Rule)=>Rule.required()

    }),
    defineField({
        name:"image",
        title:"Product Images",
        type:"array",
        of:[{type:"image",options:{  hotspot:true,}}], //POints focaux pour recadrage
        validation:(Rule)=>Rule.required().min(1).max(5)
   
    }),
    defineField({
        name:"intro",
        title:"Product Intro",
        type:"string",

    }),
    defineField({
        name:"description",
        title:"Product Description",
        type:"string",
    }),
    defineField({
        name:"price",
        title:"Product Price",
        type:"number",
        validation:(Rule)=>Rule.required().min(1)
    }),
    defineField({
        name:"discount",
        title:"Discount Price",
        type:"number",
        validation:(Rule)=>Rule.required(),
    }),
    defineField({
        name:"category",
        title:"Category",
        type:"array",
        of:[{type:"reference",to:[{type:"category"}]}],
    }),
    defineField({
        name:"stock",
        title:"Stock",
        type:"number",
        validation:(Rule)=>Rule.required().min(0)
    }),
    defineField({
        name:"status",
        title:"Product Status",
        type:"string",
        options:{
            list:[
                {title:"New",value:"new"},
                {title:"Hot",value:"hot"},
                {title:"Sale",value:"sale"},
            ]
        },
    }),
    defineField({
        name:"variants",
        title:"Product Type",
        type:"string",
        options:{
            list:[
                {title:"Tshirt",value:"tshirt"},
                {title:"Jacket",value:"jacket"},
                {title:"Pants",value:"pants"},
                {title:"Hoodie",value:"hoodie"},
                {title:"Short",value:"short"},
                {title:"Others",value:"others"},
                
            ]
        }
            
    }),
 ],
 //Interface d'appercu
    preview: {
        select: {
        title: "name",
        subtitle: "price",
        media: "images",
    },
        prepare(selection){
            const {title,subtitle,media}=selection;
            const image=media?.[0];
            return {
                title:title,
                subtitle:`$${subtitle}`,
                media:image,
            }
        },
    }
  
})
    