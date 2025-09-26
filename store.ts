import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  decreaseItem:(productId:string)=>void;
  removeItem: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        // Vérifier si le produit est déjà dans le panier
        const existingItem = state.items.find((item) => item.product._id === product._id);
        
        if (existingItem) {
          // Incrémenter la quantité si le produit existe
          return {
            items: state.items.map((item) => 
              item.product._id === product._id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else {
          // Ajouter le nouveau produit
          return { 
            items: [...state.items, { product, quantity: 1 }] 
          };
        }
      }),

      removeItem: (productId) => set((state) => {
        // Vérifier si le produit à supprimer est dans le panier
        const existingItem = state.items.find((item) => item.product._id === productId);
        
        if (existingItem) {
          return { 
            items: state.items.filter((item) => item.product._id !== productId) // ← FIX principal
          };
        } else {
          console.log("Produit non trouvé dans le panier");
          return { items: state.items };
        }
      }),

      // Placeholders pour les fonctions non implémentées
      updateQuantity: (productId, quantity) => set((state)=>{
        if(quantity<=0){
            //remove from carte
            return {items:state.items.filter((item)=>item.product._id!==productId)}
        }
        //sinon on conserve la quantity entré
        return {
            items:state.items.map((item)=>item.product._id===productId ? {... item,quantity}:item)
        }
      }),

      decreaseItem:(productId)=>set((state)=>{
        //on décremente la quantité
       const decreased = state.items.map((item)=>item.product._id===productId ? {...item,quantity:item.quantity-1} : item )
       return {items: decreased.filter((item)=> item.quantity > 0)}
      }),
   // À implémenter plus tard
      resetCart: () => set({items:[]}),
      getTotalPrice: () => {

        const {items}=get();

        return items.reduce((total,item)=>total + (item.product.price ?? 0) * item.quantity , 0  )
        
      }, 

      getSubtotalPrice: () => {
        const {items}=get();
        return items.reduce((total,item)=>{
            const price=item.product.price ?? 0;
            const discount=((item.product.discount ?? 0) * price) / 100;
            const discountedPrice = price - discount;
            return total + discountedPrice * item.quantity ;
       },0)

      },
      

      getItemCount: (productId) => {
        const item = get().items.find((item)=>item.product._id===productId)
        return item ? item.quantity : 0;
      }, 
      getGroupedItems: () => get().items,
    }),
    { 
      name: "cart-store" 
    }
  )
);

export default useCartStore;