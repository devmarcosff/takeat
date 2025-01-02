"use client";
import React, { useEffect, useState } from "react";
import LoginModal from "@/components/modal/login.modal";
import { GoAlertFill } from "react-icons/go";
import { IRestaurants } from "@/types/Types";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp, IoRestaurant } from "react-icons/io5";
import Logo from '../../../assets/logo_takeat.png'
import Image from "next/image";
import Link from "next/link";

interface InfoClient {
  name?: string | null;
  phone: string;
}

interface ClientAddress {
  address?: [];
}

export default function Login() {
  const [open, setOpen] = useState<boolean>(false);
  const [addressClient, setAddressClient] = useState<ClientAddress>([]);
  const [user, setUser] = useState<"cliente" | "restaurante" | "">("");
  const [userData, setUserData] = useState<IRestaurants | null>(null);

  const loadUserData = () => {
    const restaurantAuth = localStorage.getItem("restaurantAuth");
    if (restaurantAuth) {
      const parsedAuth: IRestaurants = JSON.parse(restaurantAuth);
      if (parsedAuth.token && parsedAuth.phone && parsedAuth.id) {
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
        return;
      }
    }

    setUser("");
    setUserData(null);
  };

  useEffect(() => {
    loadUserData();
    setAddressClient(localStorage.getItem('clientAddress'))
  }, []);

  const handleModalClose = () => {
    setOpen(false);
    loadUserData();
  };

  const handleUserSelection = (type: "cliente" | "restaurante") => {
    setOpen(true);
    setUser(type);
  };

  return (
    <div className="p-3">
      {userData ? (
        <div>
          {user === "restaurante" && (
            <div className="mb-16">
              <div className={`mb-4 p-4 divide-y flex flex-col gap-3 border border-takeat-error-400/30 rounded ${!userData.canceledAt ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-center gap-3 justify-between">
                  <h2 className="text-lg font-medium">{userData.username} <span className={`font-light text-xs underline ${!userData.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>{!userData.canceledAt ? 'Ativo' : 'Inativo'}</span></h2>
                  <Link href={'/'} onClick={() => localStorage.removeItem('restaurantAuth')} className="flex items-center gap-2 text-xs bg-takeat-error-400 px-2 py-1 shadow-md text-white font-medium rounded-sm">
                    Sair
                  </Link>
                </div>

                <p className="text-sm pt-2">Endereço: <br />{userData.address}</p>

                <div>
                  <p className="text-sm pt-2">Contatos:</p>
                  <div className="flex items-center justify-between gap-3 font-medium">
                    <button className={`text-sm underline flex items-center gap-1 ${!userData.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>
                      <MdEmail /> {userData.email}
                    </button>
                    <button className={`text-sm underline flex items-center gap-1 ${!userData.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>
                      <IoLogoWhatsapp />
                      {userData.phone}
                    </button>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm flex gap-1 font-medium">
                    <span>Taxa de serviço:</span>
                    <span className="font-normal">
                      {userData.has_service_tax
                        ? `Sim`
                        : "Não"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <p className="text-sm flex gap-1 font-medium">
                    <span>Status:</span>
                    <span className="font-normal flex items-center gap-1">
                      <div
                        className={`${!userData.canceledAt
                          ? 'bg-takeat-success-500'
                          : 'bg-takeat-error-500'
                          } rounded-full h-3 w-3 animate-pulse`}
                      ></div>{' '}
                      {userData.canceledAt
                        ? `Inativo desde ${userData.canceledAt}`
                        : "Ativo"}
                    </span>
                  </p>
                  <span className="flex items-center gap-2 text-xs font-light">
                    <div
                      className={`${userData.status == 1
                        ? 'bg-takeat-success-500'
                        : 'bg-takeat-error-500'
                        } rounded-full h-3 w-3 animate-pulse`}
                    ></div>{' '}
                    {userData.status ? 'Aberto' : 'Fechado'}
                  </span>
                </div>
              </div>

              <section className="p-3 bg-white rounded-md shadow-sm border border-takeat-gray-500">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">Refeições do restaurante</h2>
                  <IoRestaurant className="size-5 text-takeat-error-400" />
                </div>

                {userData.products?.map((item) => (
                  <div
                    // onClick={() => {
                    //   setOpen(true)
                    // }}
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
          {user === "cliente" && (
            <div className={`mb-4 p-4 divide-y flex flex-col gap-3 border border-takeat-error-400/30 rounded bg-white`}>
              <div className="flex items-center gap-3 justify-between">
                <h2 className="text-lg font-medium">{userData?.name || userData?.phone} <span className={`font-light text-xs underline ${!userData.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>{!userData.canceledAt ? 'Ativo' : 'Inativo'}</span></h2>
                <Link href={'/'} onClick={() => localStorage.removeItem('infoClient')} className="flex items-center gap-2 text-xs bg-takeat-error-400 px-2 py-1 shadow-md text-white font-medium rounded-sm">
                  Sair
                </Link>
              </div>

              {
                userData?.name && (
                  <div>
                    <div className="flex items-center justify-between gap-3 font-medium pt-2">
                      <span className={`text-sm flex items-center gap-1`}>
                        Contatos: {userData.phone}
                      </span>
                    </div>
                  </div>
                )
              }

              {
                addressClient && (
                  <div>
                    <div className="flex items-center justify-between gap-3 font-medium pt-2">
                      <span className={`text-sm flex items-center gap-1`}>
                        Endereço: {`${addressClient.address.road}, ${addressClient.address.town}, ${addressClient.address.state}`}
                      </span>
                    </div>
                  </div>
                )
              }
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center gap-5">
            <GoAlertFill className="size-28 text-takeat-error-400" />
            <h2>Não conseguimos te identificar</h2>
          </div>
          <div className="flex flex-col items-center w-full justify-between gap-3 md:max-w-80">
            <button
              className="flex items-center justify-center bg-takeat-error-50 border-takeat-error-500 border rounded-md p-4 w-full"
              onClick={() => handleUserSelection("cliente")}
            >
              Cliente
            </button>
            <button
              className="flex items-center justify-center bg-takeat-error-50 border-takeat-error-500 border rounded-md p-4 w-full"
              onClick={() => handleUserSelection("restaurante")}
            >
              Restaurante
            </button>
          </div>
        </div>
      )}

      <LoginModal open={open} setOpen={handleModalClose} typeUser={user} />
    </div>
  );
}
