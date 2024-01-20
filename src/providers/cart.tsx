"use client"

import { productWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends productWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subTotal: number;
  totalDiscount: number;
  addProductToCart: (Product: CartProduct) => void;
  decreaseProductQuantity: (ProductId: string) => void;
  increaseProductQuantity: (ProductId: string) => void;
  removeProductFromCart: (ProductId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => { },
  removeProductFromCart: () => { }
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem("@fsw-store/cart-products") || "[]"))


  useEffect(() => {
    localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products))

  }, [products])

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.totalPrice) * product.quantity
    }, 0)
  }, [products])

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  const totalDiscount = total - subTotal

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity
            }
          }

          return cartProduct;
        })
      )

      return
    }
    setProducts((prev) => [...prev, product])
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts(prev => prev.map(cartProduct => {
      if (cartProduct.id === productId) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity - 1
        }
      }

      return cartProduct
    }).filter((cartProduct) => cartProduct.quantity > 0))
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts(prev => prev.map(cartProduct => {
      if (cartProduct.id === productId) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + 1
        }
      }

      return cartProduct
    }))
  }

  const removeProductFromCart = (productId: string) => {
    setProducts(prev => prev.filter(cartProduct => cartProduct.id !== productId))
  }

  return (
    <CartContext.Provider value={{
      products,
      addProductToCart,
      decreaseProductQuantity,
      increaseProductQuantity,
      removeProductFromCart,
      total,
      subTotal,
      totalDiscount,
      cartTotalPrice: 0,
      cartBasePrice: 0,
      cartTotalDiscount: 0
    }}>{children}</CartContext.Provider>
  );
}

export default CartProvider;