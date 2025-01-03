"use client"
import { IProducts, IRestaurants } from "@/types/Types";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'react-toastify';
import LoadingCart from "./_components/loading/loading.component";
import NotFoundCart from "./_components/notFound/not-found.component";
import ProductsCart from "./_components/products/products.component";
import RestaurantCart from "./_components/restaurant/restaurant.component";
import ResumeCart from "./_components/resume/resume.component";

interface InfoClient {
  username?: string | undefined;
  phone?: string | undefined;
}

const Cart = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [infoClient, setInfoClient] = useState<InfoClient>();
  const [restaurant, setRestaurant] = useState<IRestaurants | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [subTotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const infoClient = localStorage.getItem("infoClient");
    if (infoClient) {
      const parsedClient: InfoClient = JSON.parse(infoClient);
      const phone = parsedClient.phone
      // const phoneRegex = new RegExp(/[^\d]/g)
      if (phone) setPhoneNumber(phone)
      setInfoClient(parsedClient)
    }

    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
    if (storedProducts.length > 0) {
      const restaurantId = storedProducts[0]?.restaurant_id;
      fetchRestaurant(restaurantId);
    } else {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    const calcSubtotal = products.reduce(
      (acc, product) => acc + product.value * (product.quantities ?? 0),
      0
    );
    setSubTotal(calcSubtotal);
    setTotal(calcSubtotal);
  }, [products]);

  const fetchRestaurant = async (restaurantId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${restaurantId}?type=id`);
      setRestaurant(response.data);
    } catch (error) {
      console.error("Erro ao buscar informações do restaurante:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const updateLocalStorage = (updatedProducts: IProducts[]) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    const storageEvent = new Event("storage");
    window.dispatchEvent(storageEvent);
  };

  const handleAddProduct = (id: string) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantities: (product.quantities ?? 0) + 1 } : product
    );
    updateLocalStorage(updatedProducts)
  };

  const handleRemoveProduct = (id: string) => {
    const updatedProducts = products
      .map((product) =>
        product.id === id ? { ...product, quantities: (product.quantities ?? 0) - 1 } : product
      )
      .filter((product) => (product.quantities ?? 0) > 0)
    updateLocalStorage(updatedProducts)
    if (!updatedProducts.length) setRestaurant(null)
  };


  const handleFinalizeOrder = async () => {
    setIsLoadingButton(true)
    if (!phoneNumber) {
      setTimeout(() => { setIsLoadingButton(false) }, 500)
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
      setTimeout(() => { setIsLoadingButton(false) }, 500)
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
      setIsLoadingButton(true)

      const storageEvent = new Event("storage");
      window.dispatchEvent(storageEvent);
      router.push("/");
    } catch (error) {
      setIsLoadingButton(false)
      toast.error(`Erro ao finalizar o pedido. Tente novamente mais tarde. ${error}`, {
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

    setPhoneNumber(value.slice(0, 15));
  };

  const totalWithServiceTax = restaurant?.restaurant?.has_service_tax ? total * 1.1 : total;

  return (
    <div className="p-4 pb-16 h-full">
      <LoadingCart isLoading={isLoading}>
        <NotFoundCart isNotFound={!restaurant}>
          <RestaurantCart restaurant={restaurant?.restaurant} />

          <ProductsCart handleRemoveProduct={handleRemoveProduct} handleAddProduct={handleAddProduct} products={products} />

          <ResumeCart total={total} subTotal={subTotal} totalWithServiceTax={totalWithServiceTax} />

          <div className="mb-4">
            <div className="flex items-center gap-3 justify-between mb-3">
              <h2 className="text-sm">Realizar pedido com o número:</h2>
            </div>
            {
              infoClient?.phone ? (
                <div className="relative mb-3">
                  <input
                    type="tel"
                    placeholder="Seu número de telefone"
                    value={phoneNumber}
                    disabled
                    className="w-full p-2 bg-white border rounded"
                  />
                  <button onClick={() => {
                    localStorage.removeItem('infoClient')
                    setInfoClient({ phone: undefined })
                  }} className="absolute py-2.5 right-0 font-medium h-full text-sm bg-takeat-error-50 border-takeat-gray-500 border px-2 rounded-md min-w-[150]">Trocar número</button>
                </div>
              ) : (
                <input
                  id="tel"
                  name="tel"
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  className="block w-full rounded-md bg-white mb-3 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              )
            }

            <button
              onClick={handleFinalizeOrder}
              disabled={isLoadingButton}
              className="w-full bg-takeat-error-400 text-center flex items-center justify-center text-white p-2 rounded font-medium shadow-md"
            >
              {isLoadingButton ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Finalizar Pedido'}
            </button>
          </div>
        </NotFoundCart>
      </LoadingCart>
    </div>
  );
};

export default Cart;
