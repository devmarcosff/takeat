import { IProducts } from "@/types/Types"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { IoLogoWhatsapp, IoRestaurant } from "react-icons/io5"
import { MdEmail } from "react-icons/md"
import { toast } from "react-toastify"
import { RestaurantLoginProps } from "./restaurant.types"

export default function RestaurantLogin({ restaurant }: RestaurantLoginProps) {
  const Logo = '/assets/logo_takeat.png'
  const router = useRouter()

  if (!restaurant) return null

  return (
    <div className="mb-16">
      <div className={`mb-4 p-4 divide-y flex flex-col gap-3 border border-takeat-error-400/30 rounded ${!restaurant?.canceledAt ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="flex items-center gap-3 justify-between">
          <h2 className="text-lg font-medium">{restaurant?.username} <span className={`font-light text-xs underline ${!restaurant?.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>{!restaurant?.canceledAt ? 'Ativo' : 'Inativo'}</span></h2>
          <button onClick={() => {
            axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout/${restaurant?.id}`).then(() => {
              toast.success(`Encerrando expediente do restaurante.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
              router.push('/')
              localStorage.removeItem('restaurantAuth')
            })
          }} className="flex items-center gap-2 text-xs bg-takeat-error-400 px-2 py-1 shadow-md text-white font-medium rounded-sm">
            Sair
          </button>
        </div>

        <p className="text-sm pt-2">Endereço: <br />{restaurant?.address}</p>

        <div>
          <p className="text-sm pt-2">Contatos:</p>
          <div className="flex items-center justify-between gap-3 font-medium">
            <button className={`text-sm underline flex items-center gap-1 ${!restaurant?.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>
              <MdEmail /> {restaurant?.email}
            </button>
            <button className={`text-sm underline flex items-center gap-1 ${!restaurant?.canceledAt ? 'text-takeat-success-500' : 'text-takeat-error-400'}`}>
              <IoLogoWhatsapp />
              {restaurant?.phone}
            </button>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-sm flex gap-1 font-medium">
            <span>Taxa de serviço:</span>
            <span className="font-normal">
              {restaurant?.has_service_tax
                ? `Sim`
                : "Não"}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="text-sm flex gap-1 font-medium">
            <span>Status:</span>
            <span className="font-normal flex items-center gap-1">
              <div
                className={`${!restaurant?.canceledAt
                  ? 'bg-takeat-success-500'
                  : 'bg-takeat-error-500'
                  } rounded-full h-3 w-3 animate-pulse`}
              ></div>{' '}
              {restaurant?.canceledAt
                ? `Inativo desde ${restaurant?.canceledAt}`
                : "Ativo"}
            </span>
          </div>
          <span className="flex items-center gap-2 text-xs font-light">
            <div
              className={`${restaurant?.status == 1
                ? 'bg-takeat-success-500'
                : 'bg-takeat-error-500'
                } rounded-full h-3 w-3 animate-pulse`}
            ></div>{' '}
            {restaurant?.status ? 'Aberto' : 'Fechado'}
          </span>
        </div>
      </div>

      <section className="p-3 bg-white rounded-md shadow-sm border border-takeat-gray-500">
        <div className="flex items-center gap-2">
          <IoRestaurant className="size-5 text-takeat-error-400" />
          <h2 className="font-medium">Refeições do restaurante</h2>
        </div>

        {restaurant?.products?.map((item: IProducts) => (
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
  )
}