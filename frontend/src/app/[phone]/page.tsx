"use client"
import HeaderRestaurant from "@/components/Headers/header.restaurant";
import Loading from "@/components/loading/Loading";
import { IRestaurants } from "@/types/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoRestaurant } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { RiSubtractLine } from "react-icons/ri";
import Image from "next/image";

interface Props {
  params: Promise<{ phone: string }>;
}

export default function RestaurantePage({ params }: Props) {
  const [restaurant, setRestaurant] = useState<IRestaurants | null>(null);
  const [loading, setLoading] = useState(true);

  // Estado para controlar as quantidades individualmente
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const phone = React.use(params)?.phone;

  useEffect(() => {
    if (!phone) return;

    const fetchRestaurant = async () => {
      try {
        const res = await axios.get<IRestaurants>(`https://conecta.stevanini.com.br/restaurants/${phone}`);
        setRestaurant(res.data);

        // Inicializa as quantidades com 0 para cada produto
        const initialQuantities = res.data.products.reduce((acc, product) => {
          acc[product.id] = 0; // Supondo que cada produto tenha um ID único
          return acc;
        }, {} as { [key: string]: number });

        setQuantities(initialQuantities);
        setLoading(false);
      } catch (error) {
        console.error(`Erro ao buscar o restaurante: ${error}`);
      }
    };

    fetchRestaurant();
  }, [phone]);

  // Função para incrementar a quantidade de um produto
  const increment = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  // Função para decrementar a quantidade de um produto
  const decrement = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 0 ? prev[productId] - 1 : 0, // Evita valores negativos
    }));
  };

  if (loading) return <Loading dimension />;

  if (!restaurant) return <p className="p-2">Restaurante não identificado.</p>;

  return (
    <>
      <div className="p-2">
        <HeaderRestaurant loading={loading} restaurant={restaurant} />
      </div>

      <section className="m-2 p-3 bg-white rounded-md shadow-sm border border-takeat-gray-500">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Refeições</h2>
          <IoRestaurant className="size-5 text-takeat-error-400" />
        </div>

        {restaurant.products?.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer transform-gpu mt-2 translate-x-0 shadow-sm focus:shadow-none translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]"
          >
            <div className="flex flex-col p-4 hover:bg-takeat-gray-300 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
              <div className="flex items-center gap-3">
                <Image
                  src={`https://eu.ui-avatars.com/api/?name=${item.name}`}
                  className="h-10 rounded-md shadow-md"
                  alt={item.name}
                />
                <div className="flex items-center w-full justify-between gap-2">
                  <div>
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="text-sm line-clamp-2 hover:line-clamp-6">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 border rounded-md shadow-sm w-28">
                    <button
                      onClick={() => decrement(item.id)} // Passa o ID do produto
                      disabled={quantities[item.id] === 0}
                      className={`p-2 rounded-md ${quantities[item.id] === 0 ? 'text-takeat-gray-600' : 'text-takeat-error-500'}`}
                    >
                      <RiSubtractLine />
                    </button>
                    <span className="text-sm font-medium">{quantities[item.id]}</span> {/* Mostra a quantidade do produto */}
                    <button
                      onClick={() => increment(item.id)} // Passa o ID do produto
                      className={`p-2 rounded-md text-takeat-error-500`}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
