import { PropType } from "@/types/Types";
import { IoRestaurant } from "react-icons/io5";
import Loading from "../loading/Loading";
import { SLIDES } from "../main";
import Link from "next/link";
import Image from "next/image";

export default function Restaurants({ restaurants, loading }: PropType) {
  return (
    <section className="m-2 p-3 bg-white rounded-md shadow-sm border border-takeat-gray-500">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Restaurantes</h2>
        <IoRestaurant className="size-5 text-takeat-error-400" />
      </div>

      <div className="">
        {loading && SLIDES.map((_, index) => <div className="mt-2" key={index}><Loading dimension /></div>)}

        {restaurants?.map((item, index) => {
          return (
            <Link href={`/${item.phone}`} className="cursor-pointer transform-gpu mt-2 translate-x-0 shadow-sm focus:shadow-none translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]" key={index}>
              <div className="flex flex-col p-4 hover:bg-takeat-gray-400 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
                <div className="flex items-center gap-3">
                  <Image src={item.url || `https://eu.ui-avatars.com/api/?name=${item.username}`} className="h-10 rounded-md shadow-md" alt={item.username} />
                  <div className="flex items-start w-full justify-between">
                    <div>
                      <h2 className="font-medium">{item.username}</h2>
                      <p className="text-sm flex items-center gap-1">{item.categoria || 'Geral'}</p>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-xs font-light"><div className={`${item.status == 1 ? 'bg-takeat-success-500' : 'bg-takeat-error-500'} rounded-full h-3 w-3 animate-pulse`}></div> {item.status == 1 ? 'Aberto' : 'Fechado'}</span>
                      <span className="flex items-center gap-2 text-xs font-light mt-1">{item.inicio || '08:30'} as {item.fim || '22:30'}</span>
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