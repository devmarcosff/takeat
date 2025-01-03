import Image from "next/image";
import Link from "next/link";
import { IoRestaurant } from "react-icons/io5";
import Loading from "../loading/loading.restaurants.component";
import { SLIDES } from "../main";
import { RestaurantProps } from "./restaurants.types";

export default function Restaurants({ restaurants, loading }: RestaurantProps) {
  const Logo = '/assets/logo_takeat.png'

  return (
    <section className="p-3 bg-white rounded-md shadow-sm border border-takeat-gray-500">
      <div className="flex items-center gap-2">
        <IoRestaurant className="size-5 text-takeat-error-400" />
        <h2 className="font-medium">Restaurantes</h2>
      </div>

      <div className="">
        {loading && SLIDES.map((_, index) => <div className="mt-2" key={index}><Loading dimension /></div>)}

        {restaurants?.map((item, index) => {
          return (
            <Link href={`/${item?.restaurant?.phone}`} className="cursor-pointer transform-gpu translate-x-0 shadow-sm focus:shadow-none translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]" key={index}>
              <div className="flex flex-col my-2 p-4 hover:bg-takeat-gray-400 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
                <div className="flex items-center gap-3">
                  <Image width={40} height={40} src={Logo} className="h-10" alt={`${item?.restaurant?.username}`} />
                  <div className="flex items-start w-full justify-between">
                    <div>
                      <h2 className="font-medium">{item?.restaurant?.username}</h2>
                      <p className="text-sm flex items-center gap-1">{item?.restaurant?.phone || 'Geral'}</p>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-xs font-light"><div className={`${item?.restaurant?.status == 1 ? 'bg-takeat-success-500' : 'bg-takeat-error-500'} rounded-full h-3 w-3 animate-pulse`}></div> {item?.restaurant?.status == 1 ? 'Aberto' : 'Fechado'}</span>
                      <span className="flex items-center gap-2 text-xs font-light mt-1">{item?.restaurant?.inicio || '08:30'} as {item?.restaurant?.fim || '22:30'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}