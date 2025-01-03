"use client"
import { IRestaurants } from "@/types/Types";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import img from '../../../public/assets/picanha.jpg';

interface ModalProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  restaurantId: IRestaurants['restaurant']
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

export interface IAddProduct {
  id?: string,
  name?: string,
  description?: string,
  value?: number | string | undefined,
  restaurant_id?: string,
  quantities?: number
}

export default function ProductRegisterModal({ open, setOpen, restaurantId }: ModalProps) {
  const { register, handleSubmit } = useForm()
  const [nameProduct, setNameProduct] = useState<IAddProduct>()
  const [descriptionProduct, setDescriptionProduct] = useState<IAddProduct>()
  const [valueProduct, setValueProduct] = useState<IAddProduct>()

  const addProductToRestaurant = async (data: IAddProduct) => {
    const payload = {
      name: data.name,
      description: data.description,
      value: Number(valueProduct?.value),
      restaurant_id: restaurantId?.id
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, payload).then(() => {
      setOpen(false)
      toast.success("Sucesso ao cadastrar produto")
      const payload = {
        name: '',
        description: '',
        value: '',
        restaurant_id: ''
      }

      return payload
    }).catch((err) => {
      toast.error('Error', err)
    })
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
              <div className="shadow-md border border-takeat-error-500/60 rounded-md overflow-hidden">
                <div>
                  <Image
                    width={500}
                    height={250}
                    src={img}
                    alt="img"
                    className="h-[250] w-full rounded-md"
                  />
                </div>
                <div className="m-2">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    {nameProduct?.name || "Nome do produto"}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {descriptionProduct?.description || "Descrição do produto"}
                    </p>
                    <p className="mt-2">
                      R$ {valueProduct?.value || "0,00"}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(addProductToRestaurant)}>
                <div className="mt-2 shadow-sm rounded-md w-full">
                  <p className="text-gray-700 text-sm">Nome do produto</p>
                  <input
                    {...register('name')}
                    onChange={(e) => setNameProduct({ name: e.target.value })}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Picanha Bovina - 200g"
                    className="border focus:bg-takeat-error-50 focus:border-takeat-error-400 border-takeat-gray-500 font-extralight text-xs w-full rounded-md p-2 shadow-sm"
                  />
                </div>
                <div className="mt-2 shadow-sm rounded-md w-full">
                  <p className="text-gray-700 text-sm">Descrição</p>
                  <textarea
                    {...register('description')}
                    onChange={(e) => setDescriptionProduct({ description: e.target.value })}
                    name="description"
                    id="description"
                    placeholder="Picanha Bovina - 200g"
                    className="border focus:bg-takeat-error-50 focus:border-takeat-error-400 border-takeat-gray-500 font-extralight text-xs w-full rounded-md p-2 shadow-sm"
                  />
                </div>

                <div className="w-full flex gap-3 justify-between items-end">
                  <div className="shadow-sm rounded-md w-full">
                    <p className="text-gray-700 text-sm">Valor</p>
                    <input
                      onChange={(e) => setValueProduct({ value: e.target.value.replace(/,/g, ".") })}
                      type="text"
                      name="value"
                      id="value"
                      placeholder="59,90"
                      className="border focus:bg-takeat-error-50 focus:border-takeat-error-400 border-takeat-gray-500 font-extralight text-xs w-full rounded-md p-2 shadow-sm"
                    />
                  </div>
                  <div className="shadow-sm rounded-md w-full">
                    <button
                      className={`border border-takeat-gray-500 bg-takeat-error-400 text-white font-medium text-xs w-full rounded-md p-2 shadow-md`}>
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
