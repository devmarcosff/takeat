import { IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RestaurantCartProps } from "./restaurant.types";

export default function RestaurantCart({ restaurant }: RestaurantCartProps) {
 
  if (!restaurant) return null

  return (
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
  )
}