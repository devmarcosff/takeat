"use client"
import { ISingleRestaurants } from "@/app/[phone]/page";
import Image from "next/image";
import { TiLocation } from "react-icons/ti";

interface HeaderProps {
  restaurant: ISingleRestaurants
}

export default function HeaderRestaurant({ restaurant }: HeaderProps) {
  const Logo = '/assets/logo_takeat.png'
  
  return (
    <div className="flex flex-col gap-3 p-3 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
      <div className="flex items-center gap-3">
        <Image width={64} height={64} src={Logo} className="h-16" alt={`${restaurant.username}`} />
        <div>
          <h2 className="font-medium">{restaurant.username}</h2>
          <p className="text-sm flex items-center gap-1"><TiLocation /> {restaurant.address}</p>
        </div>
      </div>
      <hr className="text-takeat-black-500 border" />
      <div className="flex items-center mx-3 gap-2 divide-x divide-takeat-gray-500">
        <span className="flex items-center gap-2 text-xs font-light px-2"><div className={`${restaurant.status ? 'bg-takeat-success-500' : 'bg-takeat-error-500'} rounded-full h-3 w-3 animate-pulse`}></div> Delivery</span>
        <span className="flex items-center gap-2 text-xs font-light px-2"><div className={`${restaurant.status ? 'bg-takeat-success-500' : 'bg-takeat-error-500'} rounded-full h-3 w-3 animate-pulse`}></div> Retirada</span>
        <span className="flex items-center gap-2 text-xs font-light px-2"><div className={`${restaurant.status ? 'bg-takeat-success-500' : 'bg-takeat-error-500'} rounded-full h-3 w-3 animate-pulse`}></div> {restaurant.status ? 'Aberto' : 'Fechado'}</span>
      </div>
    </div>
  )
}