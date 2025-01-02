"use client"
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { IProducts } from "@/types/Types";
import Link from "next/link";
import Logo from '../../../assets/logo_takeat.png'
import Image from "next/image";
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalProps {
  open: boolean,
  setOpen: any,
  snack?: IProducts
  typeUser?: string
}

export default function LoginModal({ open, setOpen, typeUser }: ModalProps) {
  const [phone, setPhone] = useState("");
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false)

  const handleNewPhoneClient = (data: any) => {
    const payload = {
      name: data.name,
      phone: phone
    }
    localStorage.setItem('infoClient', JSON.stringify(payload))
    setOpen(false)
    setPhone('')
  };

  const handleAuthRestaurant = ({ email, password }: any) => {
    setLoading(true)

    const payload = {
      identifier: email,
      password: password
    }

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, payload).then((res) => {
      localStorage.setItem("restaurantAuth", JSON.stringify(res.data));
      toast.success(`Conectando ao restaurante...`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setLoading(false)
      setOpen(false)
    }).catch(err => {
      toast.error(`${err.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setLoading(false)
    })
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 0) {
      value = "(" + value;
    }
    if (value.length > 3) {
      value = value.slice(0, 3) + ") " + value.slice(3);
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + "-" + value.slice(10);
    }

    setPhone(value.slice(0, 15));
  };

  if (typeUser === 'cliente') {
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
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <Image
                    alt="Takeat App"
                    width={40}
                    height={40}
                    src={Logo}
                    className="mx-auto h-10 w-auto"
                  />
                  <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-takeat-black-500">
                    Takeat App
                  </h2>
                  <p className="text-center text-sm">Informe seu número de telefone.</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={handleSubmit(handleNewPhoneClient)}>
                    <div>
                      <label className="block text-sm/6 font-medium text-gray-900">
                        Nome <span className="text-xs text-takeat-error-400">(Opicional)</span>
                      </label>
                      <div className="mt-2">
                        <input
                          {...register('name')}
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Insira seu nome"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm/6 font-medium text-gray-900">
                        Telefone
                      </label>
                      <div className="mt-2">
                        <input
                          id="tel"
                          name="tel"
                          type="text"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          maxLength={15}
                          autoComplete="tel"
                          placeholder="(00) 00000-0000"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        className="flex w-full justify-center transition-all rounded-md bg-takeat-error-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-takeat-error-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Confirmar telefone
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  } else {
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
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <Image
                    alt="Takeat App"
                    width={40}
                    height={40}
                    src={Logo}
                    className="mx-auto h-10 w-auto"
                  />
                  <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-takeat-black-500">
                    Takeat App
                  </h2>
                  <p className="text-center text-sm">Faça login na sua conta</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={handleSubmit(handleAuthRestaurant)}>
                    <div>
                      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          {...register('email')}
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                          Senha
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          {...register('password')}
                          id="password"
                          name="password"
                          type="password"
                          required
                          autoComplete="current-password"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        className="flex w-full justify-center transition-all rounded-md bg-takeat-error-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-takeat-error-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Acessar'}
                      </button>
                    </div>
                  </form>

                  <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Não possui conta?{' '}
                    <a href="#" className="font-semibold text-takeat-error-400 hover:text-takeat-error-500 transition-all">
                      Criar conta agora
                    </a>
                  </p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }
}
