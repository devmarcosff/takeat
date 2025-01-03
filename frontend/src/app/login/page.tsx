"use client";
import { BuyerProps, IRestaurants, OrderProps } from "@/types/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import ClientLogin from "./_components/client/client.component";
import NotFoundLogin from "./_components/not-found/not-found.component";
import RestaurantLogin from "./_components/restaurant/restaurant.component";

interface InfoClient {
  name?: string;
  phone: string;
}

export default function Login() {
  const [open, setOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderProps[]>();
  const [orderRestaurant, setOrderRestaurant] = useState<BuyerProps>();
  const [openClient, setOpenClient] = useState<boolean>(false);
  const [userRestaurantData, setUserRestaurantData] = useState<IRestaurants>();
  const [userClientData, setUserClient] = useState<InfoClient>();

  const loadUserData = () => {
    const restaurantAuth = localStorage.getItem("restaurantAuth");
    if (restaurantAuth) {
      const parsedAuth: IRestaurants = JSON.parse(restaurantAuth);
      if (parsedAuth.accessToken && parsedAuth.restaurant?.phone && parsedAuth.restaurant.id) {
        setUserRestaurantData(parsedAuth);
        return;
      }
    }

    const infoClient = localStorage.getItem("infoClient");
    if (infoClient) {
      const parsedClient: InfoClient = JSON.parse(infoClient);
      if (parsedClient.phone) {
        setUserClient(parsedClient);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/buyers/${parsedClient.phone.replace(/[^\d]/g, "")}`)
          .then((res) => {
            setOrders(res.data.orders)
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${res.data.orders[0].restaurantId}?type=id`).then(res => setOrderRestaurant(res.data)).catch(e => console.log(e.response.data.message))
          })
          .catch((err) => console.log(err.response.data.message))
        return;
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleModalClose = () => {
    setOpen(false);
    setOpenClient(false);
    loadUserData();
  };

  const handleOpenClient = () => {
    setOpenClient(true);
  };

  const isNotFound = !userRestaurantData && !userClientData

  return (
    <NotFoundLogin handleModalClose={handleModalClose} handleOpenClient={handleOpenClient} open={open} setOpen={setOpen} openClient={openClient} isNotFound={isNotFound}>
      <div className="p-3" >
        <RestaurantLogin restaurant={userRestaurantData?.restaurant} />

        <ClientLogin orderRestaurant={orderRestaurant} orders={orders} userClient={userClientData} />
      </div>
    </NotFoundLogin >
  );
}
