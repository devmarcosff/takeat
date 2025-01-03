"use client";
import React, { useEffect, useState } from "react";
import LoginModal from "@/components/modal/login.modal";
import { GoAlertFill } from "react-icons/go";
import { IProducts, IRestaurants } from "@/types/Types";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp, IoRestaurant } from "react-icons/io5";
import Logo from '../../../assets/logo_takeat.png'
import Image from "next/image";
import Link from "next/link";
import LoginClientModal from "@/components/modal/loginClient.modal";
import Header from "@/components/headers/header.home.component";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface InfoClient {
  name?: string | null;
  phone: string;
}

export default function Login() {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false);
  const [detailsProducts, setDetailsProducts] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>(null);
  const [orderRestaurant, setOrderRestaurant] = useState<any>('');
  const [openClient, setOpenClient] = useState<boolean>(false);
  const [user, setUser] = useState<"cliente" | "restaurante" | "">("");
  const [userData, setUserData] = useState<IRestaurants | any>(null);

  const loadUserData = () => {
    const restaurantAuth = localStorage.getItem("restaurantAuth");
    if (restaurantAuth) {
      const parsedAuth: IRestaurants = JSON.parse(restaurantAuth);
      if (parsedAuth.accessToken && parsedAuth.restaurant?.phone && parsedAuth.restaurant.id) {
        setUser("restaurante");
        setUserData(parsedAuth);
        return;
      }
    }

    const infoClient = localStorage.getItem("infoClient");
    if (infoClient) {
      const parsedClient: InfoClient = JSON.parse(infoClient);
      if (parsedClient.phone) {
        setUser("cliente");
        setUserData(parsedClient);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/buyers/${parsedClient.phone.replace(/[^\d]/g, "")}`)
          .then((res) => {
            setOrders(res.data.orders)
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${res.data.orders[0].restaurantId}?type=id`).then(res => setOrderRestaurant(res.data)).catch(e => console.log(e.response.data.message))
          })
          .catch((err) => console.log(err.response.data.message))
        return;
      }
    }

    setUser("");
    setUserData(null);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleModalClose = () => {
    setOpen(false);
    setOpenClient(false);
    loadUserData();
  };

  const handleUserSelection = (type: "cliente" | "restaurante") => {
    setOpen(true);
  };

  const handleOpenClient = () => {
    setOpenClient(true);
  };

  return (
    userData ? (
      <div className="p-3" >
        {user === "restaurante" && (
          <div className="mb-16">
            <div className={`mb-4 p-4 divide-y flex flex-col gap-3 border border-takeat-error-400/30 rounded ${!userData.restaurant?.canceledAt ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className="flex items-center gap-3 justify-between">
                <h2 className="text-lg font-medium">{userData.restaurant?.username} <span className={`font-light text-xs underline ${!userData.restaurant?.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>{!userData.restaurant?.canceledAt ? 'Ativo' : 'Inativo'}</span></h2>
                <button onClick={() => {
                  axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout/${userData.restaurant?.id}`).then(() => {
                    toast.success(`Encerrando expediente do restaurante.`, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    })
                    router.push('/')
                    localStorage.removeItem('restaurantAuth')
                  })
                }} className="flex items-center gap-2 text-xs bg-takeat-error-400 px-2 py-1 shadow-md text-white font-medium rounded-sm">
                  Sair
                </button>
              </div>

              <p className="text-sm pt-2">Endereço: <br />{userData.restaurant?.address}</p>

              <div>
                <p className="text-sm pt-2">Contatos:</p>
                <div className="flex items-center justify-between gap-3 font-medium">
                  <button className={`text-sm underline flex items-center gap-1 ${!userData.restaurant?.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>
                    <MdEmail /> {userData.restaurant?.email}
                  </button>
                  <button className={`text-sm underline flex items-center gap-1 ${!userData.restaurant?.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>
                    <IoLogoWhatsapp />
                    {userData.restaurant?.phone}
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm flex gap-1 font-medium">
                  <span>Taxa de serviço:</span>
                  <span className="font-normal">
                    {userData.restaurant?.has_service_tax
                      ? `Sim`
                      : "Não"}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="text-sm flex gap-1 font-medium">
                  <span>Status:</span>
                  <span className="font-normal flex items-center gap-1">
                    <div
                      className={`${!userData.restaurant?.canceledAt
                        ? 'bg-takeat-success-500'
                        : 'bg-takeat-error-500'
                        } rounded-full h-3 w-3 animate-pulse`}
                    ></div>{' '}
                    {userData.restaurant?.canceledAt
                      ? `Inativo desde ${userData.restaurant?.canceledAt}`
                      : "Ativo"}
                  </span>
                </div>
                <span className="flex items-center gap-2 text-xs font-light">
                  <div
                    className={`${userData.restaurant?.status == 1
                      ? 'bg-takeat-success-500'
                      : 'bg-takeat-error-500'
                      } rounded-full h-3 w-3 animate-pulse`}
                  ></div>{' '}
                  {userData.restaurant?.status ? 'Aberto' : 'Fechado'}
                </span>
              </div>
            </div>

            <section className="p-3 bg-white rounded-md shadow-sm border border-takeat-gray-500">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">Refeições do restaurante</h2>
                <IoRestaurant className="size-5 text-takeat-error-400" />
              </div>

              {userData.restaurant?.products?.map((item: IProducts) => (
                <div
                  onClick={() => {
                    setOpen(true)
                  }}
                  key={item.id}
                  className="cursor-pointer transform-gpu mt-2 translate-x-0 shadow-sm focus:shadow-none translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]"
                >
                  <div className="flex flex-col p-4 hover:bg-takeat-gray-300 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center w-full justify-between gap-2">
                        <div>
                          <h2 className="font-normal text-sm">{item.name}</h2>
                          <p className="text-xs line-clamp-2 text-takeat-gray-700 font-thin">{item.description}</p>
                          <p className="text-xs line-clamp-2">R$ {item.value}</p>
                        </div>
                      </div>
                      <Image
                        width={40}
                        height={40}
                        src={Logo}
                        className="h-10"
                        alt={'Takeat'}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
        {
          user === "cliente" && (
            <div className="pb-16">
              <div className={`mb-4 p-4 divide-y flex flex-col gap-3 border border-takeat-error-400/30 rounded bg-white`}>
                <div className="flex items-center gap-3 justify-between">
                  <Header username={userData?.username} phone={userData?.phone} />
                </div>

                {
                  userData?.restaurant?.username && (
                    <div>
                      <div className="flex items-center justify-between gap-3 font-medium pt-2">
                        <span className={`text-sm flex items-center gap-1`}>
                          Contatos: {userData.restaurant?.phone}
                        </span>
                      </div>
                    </div>
                  )
                }
              </div>

              <div className={`mb-4 p-4 divide-y flex flex-col gap-3 border border-takeat-error-400/30 rounded bg-white`}>
                <div className="flex items-center justify-between gap-3 font-medium">
                  <span className={`text-sm flex items-center gap-1`}>Meus pedidos</span>
                </div>
                <div>
                  {
                    orders ?
                      orders
                        ?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Ordena do mais recente para o mais antigo
                        .map((item: any, index: any) => {
                          return (
                            <div key={index}>
                              <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50">
                                <h2 className="text-lg font-medium mb-2">{orderRestaurant.username ? orderRestaurant.username : 'Não definido'}</h2>
                                <div className="flex justify-between text-sm">
                                  <span>Pedido feito em {moment(item.createdAt).format("DD/MM/YYYY - HH:mm")}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Quantidade de pedidos:</span>
                                  <span>{item.amount}</span>
                                </div>
                                {
                                  item.has_service_tax === true && (
                                    <div className="flex justify-between text-sm">
                                      <span>Taxa do restaurante:</span>
                                      <span>R$ {Number(item.total_service_price - item.total_price).toFixed(2)}</span>
                                    </div>
                                  )
                                }
                                <div className="flex justify-between text-sm">
                                  <span>Total:</span>
                                  <span>R$ {item.total_service_price.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        }) : 'Nenhum pedido encontrado'
                  }
                </div>
              </div>
            </div>
          )
        }
      </div >
    ) : (
      <div className="flex flex-col justify-center h-full w-full items-center gap-10 px-3">
        <div className="flex flex-col justify-center items-center gap-5">
          <GoAlertFill className="size-28 text-takeat-error-400" />
          <h2>Não conseguimos te identificar</h2>
        </div>
        <div className="flex flex-col items-center w-full justify-between gap-3 md:max-w-80">
          <button
            className="flex items-center justify-center transition-all bg-takeat-error-50 border-takeat-error-500 hover:bg-takeat-error-400 hover:text-white hover:border-takeat-error-50 border rounded-md p-4 w-full"
            onClick={() => handleOpenClient()}
          >
            Cliente
          </button>
          <button
            className="flex items-center justify-center transition-all bg-takeat-error-50 border-takeat-error-500 hover:bg-takeat-error-400 hover:text-white hover:border-takeat-error-50 border rounded-md p-4 w-full"
            onClick={() => handleUserSelection("restaurante")}
          >
            Restaurante
          </button>
        </div>

        <LoginModal open={open} setOpen={handleModalClose} typeUser={user} />
        <LoginClientModal openClient={openClient} setOpenClient={handleModalClose} />
      </div>
    )
  );
}
