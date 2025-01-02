"use client"
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiSubtractLine } from "react-icons/ri";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IProducts } from "@/types/Types";

interface ModalProps {
  open: boolean,
  setOpen: any,
  snack: IProducts
}

export const formatToBRL = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

export const calculateTotal = (quantities: number, value: number): number => {
  const total = quantities * value;
  return parseFloat(total.toFixed(2));
};

export default function ProductModal({ open, setOpen, snack }: ModalProps) {
  const img = 'https://takeat-imgs.takeat.app/e29317dec0a27d9c890ce52053160d7a.webp'
  const [quantities, setQuantities] = useState<number>(0);
  const increment = () => setQuantities(quantities + 1);
  const decrement = () => setQuantities(quantities > 0 ? quantities - 1 : 0);

  useEffect(() => {
    setQuantities(0);
  }, [open == false])

  const addProductToLocalStorage = (product: IProducts): void => {
    if (typeof window === "undefined") return;
  
    const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
  
    const productIndex = existingProducts.findIndex(
      (existingProduct: IProducts) => existingProduct.id === product.id
    );
  
    if (productIndex > -1) {
      existingProducts[productIndex].quantities += product.quantities;
    } else {
      existingProducts.push(product);
    }
  
    localStorage.setItem("products", JSON.stringify(existingProducts));
  
    window.dispatchEvent(new Event("productsUpdated"));
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <img
                  src={img}
                  alt="img"
                  className="h-[250] w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="mt-3">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  {snack?.name}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {snack?.description}
                  </p>
                  <p className="mt-2">
                    R$ {snack?.value}
                  </p>
                </div>
              </div>
              <div className="mt-2 border border-takeat-gray-500 shadow-sm rounded-sm p-2">
                <p className="text-xs text-gray-500">
                  50 - 60 min / R$2,00 taxa de entrega
                </p>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">
                  Alguma observação?
                </p>
                <input type="text" placeholder="Ex: Tirar a cebola, maionese à parte, etc" className="border focus:bg-takeat-error-50 focus:border-takeat-gray-700 border-takeat-gray-500 font-extralight text-xs w-full rounded-sm p-2 shadow-sm" name="" id="" />
              </div>
            </div>
            <hr />
            <div className="px-4 py-3 gap-3 w-full flex items-center justify-between">
              <button onClick={() => {
                setOpen(false)
                setQuantities(0)
                addProductToLocalStorage({
                  id: snack.id,
                  name: snack.name,
                  description: snack.description,
                  value: snack?.value,
                  restaurant_id: snack.restaurant_id,
                  quantities: quantities
                })
              }}
                disabled={quantities === 0}
                className={`disabled:bg-takeat-error-400 flex items-center justify-between w-full bg-takeat-error-500 text-white px-4 py-2 rounded-md shadow-md`}>
                <span>Adicionar</span>
                <span>{formatToBRL(quantities * snack?.value)}</span>
              </button>
              <div className="flex items-center justify-center gap-2 border border-takeat-gray-500 rounded-sm shadow-sm w-28  px-4 py-2">
                <button
                  onClick={() => decrement()}
                  disabled={quantities === 0}
                  className={`px-2 rounded-md`}
                >
                  <RiSubtractLine />
                </button>
                <span className="text-sm font-medium">{quantities}</span>
                <button
                  onClick={() => increment()}
                  className={`px-2 rounded-md text-takeat-error-500`}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
