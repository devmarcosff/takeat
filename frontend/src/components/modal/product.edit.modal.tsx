"use client"
import { IProducts } from "@/types/Types";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import img from '../../../public/assets/picanha.jpg';

interface ModalProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  snack: IProducts | undefined
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

export default function ProductEditModal({ open, setOpen, snack }: ModalProps) {
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
                <Image
                  width={500}
                  height={250}
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
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
