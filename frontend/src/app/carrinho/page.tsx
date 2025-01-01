"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { IProducts, IRestaurants } from "@/types/Types";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

const Cart = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [restaurant, setRestaurant] = useState<IRestaurants | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);

    if (storedProducts.length > 0) {
      const restaurantId = storedProducts[0]?.restaurant_id;
      fetchRestaurant(restaurantId);
    }
  }, []);

  useEffect(() => {
    const calcSubtotal = products.reduce(
      (acc, product) => acc + product.value * product.quantities,
      0
    );
    setSubtotal(calcSubtotal);
    setTotal(calcSubtotal);
  }, [products]);

  const fetchRestaurant = async (restaurantId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${restaurantId}`);
      setRestaurant(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error("Erro ao buscar informações do restaurante:", error);
    }
  };

  const handleAddProduct = (id: string) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantities: product.quantities + 1 } : product
    );
    updateLocalStorage(updatedProducts);
  };

  const handleRemoveProduct = (id: string) => {
    const updatedProducts = products
      .map((product) =>
        product.id === id ? { ...product, quantities: product.quantities - 1 } : product
      )
      .filter((product) => product.quantities > 0);
    updateLocalStorage(updatedProducts);
  };

  const updateLocalStorage = (updatedProducts: IProducts[]) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleFinalizeOrder = async () => {
    if (!phoneNumber) {
      toast.error('Por favor, insira o número de telefone.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!restaurant) {
      toast.error('Erro ao identificar o restaurante.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const payload = {
      buyerPhone: phoneNumber,
      products: products.map((product) => ({
        id: product.id,
        amount: product.quantities,
      })),
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, payload);

      toast.success('Pedido finalizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      localStorage.removeItem("products");
      setProducts([]);
      setPhoneNumber("");
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
      toast.error('Erro ao finalizar o pedido. Tente novamente mais tarde.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const totalWithServiceTax = restaurant?.has_service_tax ? total * 1.1 : total;

  return (
    <div className="p-4 pb-16">
      {isLoading ? (
        <div className="space-y-4">
          <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50 animate-pulse">
            <div className="flex items-center gap-3 justify-between w-full">
              <div className="h-5 bg-gray-300 rounded w-2/5"></div>
              <div className="flex items-center gap-2 w-full justify-end">
                <div className="bg-gray-300 rounded-full h-3 w-3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded mt-2 w-3/4"></div>
            <div className="flex items-center justify-between gap-3 mt-4">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>

          <div className="animate-pulse bg-gray-50 p-4 border border-takeat-error-400/30 rounded divide-y divide-takeat-error-400/30">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-2 flex flex-col gap-3">
                <div>
                  <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/3"></div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                  <div className="h-6 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-pulse bg-gray-50 p-4 border border-takeat-error-400/30 rounded flex items-end gap-5">
            <div className="flex w-full flex-col">
              <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="flex w-full flex-col items-end">
              <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>

          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ) : (
        <>
          {restaurant && (
            <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50">
              <div className="flex items-center gap-3 justify-between">
                <h2 className="text-lg font-medium">{restaurant.username}</h2>
                <span className="flex items-center gap-2 text-xs font-light">
                  <div
                    className={`${restaurant.status == 1
                      ? 'bg-takeat-success-500'
                      : 'bg-takeat-error-500'
                      } rounded-full h-3 w-3 animate-pulse`}
                  ></div>{' '}
                  {restaurant.status ? 'Aberto' : 'Fechado'}
                </span>
              </div>
              <p className="text-sm">{restaurant.address}</p>
              <div className="flex items-center justify-between gap-3">
                <button className="text-sm underline flex items-center gap-1 text-takeat-error-400">
                  <MdEmail /> {restaurant.email}
                </button>
                <button className="text-sm underline flex items-center gap-1 text-takeat-error-400">
                  <IoLogoWhatsapp />
                  {restaurant.phone}
                </button>
              </div>
            </div>
          )}

          {!!products.length && (
            <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50 divide-y divide-takeat-error-400/30">
              {products.map((product) => (
                <div key={product.id} >
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <h3 className="text-md font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-3">
                    <p className="text-sm mt-1 font-medium">
                      {product.quantities} x R$ {product.value.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-center gap-2 border border-takeat-gray-500 rounded-sm shadow-sm w-28 px-4 py-2">
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className={`px-2 rounded-md text-takeat-error-500`}
                      >
                        {
                          product.quantities === 1 ? <FaTrashAlt className="text-sm" /> : <RiSubtractLine className="text-sm" />
                        }
                      </button>
                      <span className="text-sm font-medium">{product.quantities}</span>
                      <button
                        onClick={() => handleAddProduct(product.id)}
                        className={`px-2 rounded-md text-takeat-error-500 text-sm`}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50">
            <h2 className="text-lg font-medium mb-2">Resumo</h2>
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxa do restaurante:</span>
              <span>R$ {Number(totalWithServiceTax - total).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total:</span>
              <span>R$ {totalWithServiceTax.toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="tel"
              placeholder="Seu número de telefone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleFinalizeOrder}
              className="w-full bg-takeat-error-400 text-white p-2 rounded font-bold"
            >
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
