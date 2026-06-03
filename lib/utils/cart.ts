import { useEffect, useState } from "react";


import { CartItem } from "@/types/cartItem";

export const addToCart = (
  planDesc: string,
  mode: string,
  planTerm: string,
  quantity: number,
  price: number,
  total: number,
  contractPrice: number,
) => {
  if (
    !planDesc ||
    !mode ||
    !planTerm ||
    !total ||
    !quantity ||
    !price ||
    !contractPrice
  )
    return;

  const stored = sessionStorage.getItem("Cart");
  const cart = stored ? (JSON.parse(stored) as CartItem[]) : [];
  const normalizedTotal = price * quantity;
  const exactItemIndex = cart.findIndex(
    (item: CartItem) =>
      item.planDesc === planDesc &&
      item.mode === mode &&
      item.planTerm === planTerm,
  );

  if (exactItemIndex >= 0) {
    const existingItem = cart[exactItemIndex];
    cart[exactItemIndex] = {
      ...existingItem,
      quantity: existingItem.quantity + quantity,
      price,
      total: (existingItem.quantity + quantity) * price,
      contractPrice,
    };
  } else {
    const newItem: CartItem = {
      planDesc,
      mode,
      planTerm,
      quantity,
      price,
      total: normalizedTotal,
      contractPrice,
    };

    cart.push(newItem);
  }

  sessionStorage.setItem("Cart", JSON.stringify(cart));
};

