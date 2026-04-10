import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  decreaseItem: (productId: string, color?: string, size?: string) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;
  getItemCount: (productId: string, color?: string, size?: string) => number;
  getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, color, size) => set((state) => {
        // Un item est unique par son ID ET ses variantes
        const existingItem = state.items.find((item) => 
          item.product._id === product._id && 
          item.selectedColor === color && 
          item.selectedSize === size
        );
        
        if (existingItem) {
          return {
            items: state.items.map((item) => 
              (item.product._id === product._id && item.selectedColor === color && item.selectedSize === size)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else {
          return { 
            items: [...state.items, { product, quantity: 1, selectedColor: color, selectedSize: size }] 
          };
        }
      }),

      removeItem: (productId, color, size) => set((state) => ({ 
        items: state.items.filter((item) => 
          !(item.product._id === productId && item.selectedColor === color && item.selectedSize === size)
        )
      })),

      updateQuantity: (productId, quantity, color, size) => set((state) => {
        if (quantity <= 0) {
          return { 
            items: state.items.filter((item) => 
              !(item.product._id === productId && item.selectedColor === color && item.selectedSize === size)
            ) 
          };
        }
        return {
          items: state.items.map((item) => 
            (item.product._id === productId && item.selectedColor === color && item.selectedSize === size)
              ? { ...item, quantity }
              : item
          )
        };
      }),

      decreaseItem: (productId, color, size) => set((state) => {
        const decreased = state.items.map((item) => 
          (item.product._id === productId && item.selectedColor === color && item.selectedSize === size)
            ? { ...item, quantity: item.quantity - 1 } 
            : item 
        );
        return { items: decreased.filter((item) => item.quantity > 0) };
      }),

      resetCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);
      }, 

      getSubtotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price - discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },

      getItemCount: (productId, color, size) => {
        const item = get().items.find((item) => 
          item.product._id === productId && 
          item.selectedColor === color && 
          item.selectedSize === size
        );
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