"use client"
import HeaderRestaurant from "../../components/Headers/header.restaurant.component";
import LoadingHeader from "../../components/Headers/header.home.component";
import Loading from "../../components/Loading/loading.restaurants.component";
import ProductModal from "../../components/modal/product.modal";
import { IProducts } from "../../types/Types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoRestaurant } from "react-icons/io5";

interface Props {
  params: Promise<{ phone: string }>;
}

export interface ISingleRestaurants {
  id?: string; // UUID
  url?: string; // URL da imagem
  username?: string; // Nome do restaurante
  email?: string; // Email do restaurante
  phone?: string; // Telefone em formato string
  address?: string; // Endereço
  categoria?: string; // Categoria do restaurante
  has_service_tax?: boolean; // Indica se há taxa de serviço
  canceledAt?: string | null; // Data de cancelamento ou null
  createdAt?: Date | string
  inicio?: string; // Hora de início no formato string (ex?: "8?:30")
  fim?: string; // Hora de término no formato string (ex?: "22?:40")
  status?: number; // Status numérico
  createAt?: string; // Data de criação em formato string (ISO 8601)
  products?: IProducts[]
}

export default function RestaurantePage({ params }: Props) {
  const Logo = '/assets/logo_takeat.png'
  const [restaurant, setRestaurant] = useState<ISingleRestaurants | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)
  const [snack, setSnack] = useState<IProducts>({
    id: '',
    name: '',
    description: '',
    value: 0,
    restaurant_id: '',
    quantities: 0
  })

  const phone = React.use(params)?.phone;

  useEffect(() => {
    if (!phone) return;

    const fetchRestaurant = async () => {
      try {
        const res = await axios.get<ISingleRestaurants>(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${phone}`);
        setRestaurant(res.data);
        setLoading(false);
      } catch (error) {
        console.error(`Erro ao buscar o restaurante: ${error}`);
      }
    };

    fetchRestaurant();
  }, [phone]);

  if (loading) return (
    <div className="p-2 flex flex-col gap-2">
      <LoadingHeader />
      <Loading dimension />
    </div>
  );

  if (!restaurant) return <p className="p-2">Restaurante não identificado.</p>;

  return (
    <>
      <div className="m-2">
        <HeaderRestaurant restaurant={restaurant} />
      </div>

      <section className="mx-2 p-3 bg-white rounded-md shadow-sm border border-takeat-gray-500">
        <div className="flex items-center gap-2">
          <IoRestaurant className="size-5 text-takeat-error-400" />
          <h2 className="font-medium">Refeições</h2>
        </div>

        {restaurant.products?.map((item) => (
          <div
            onClick={() => {
              setOpen(true)
              setSnack(item)
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

      <ProductModal open={open} setOpen={setOpen} snack={snack} />
    </>
  );
}
