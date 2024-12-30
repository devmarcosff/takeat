import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image';

interface IRestaurants {
  id: string; // UUID
  url: string; // URL da imagem
  username: string; // Nome do restaurante
  email: string; // Email do restaurante
  phone: string; // Telefone em formato string
  address: string; // Endereço
  categoria: string; // Categoria do restaurante
  has_service_tax: boolean; // Indica se há taxa de serviço
  canceledAt: string | null; // Data de cancelamento ou null
  createdAt: Date | string
  inicio: string; // Hora de início no formato string (ex: "8:30")
  fim: string; // Hora de término no formato string (ex: "22:40")
  status: number; // Status numérico
  createAt: string; // Data de criação em formato string (ISO 8601)
  // products: IProducts[]
}

type PropType = {
  slides: IRestaurants[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  return (
    <section className={`max-w-3xl mx-auto [--slide-spacing:.5rem] ${slides.length == 1 ? '[--slide-size:98%]' : '[--slide-size:85%]'} ml-2 my-2`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex [touch-action:pan-y] ml-[calc(var(--slide-spacing)*-1)]">
          {slides.map((item, index) => {
            return (
              item.status == 1 && (
                <div className="transform-gpu translate-x-0 translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]" key={index}>
                  <div className="flex flex-col p-4 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
                    <div className="flex items-center gap-3">
                      <Image src={item.url} className="h-10" alt={item.username} />
                      <div className="flex items-start w-full justify-between">
                        <div>
                          <h2 className="font-medium">{item.username}</h2>
                          <p className="text-sm flex items-center gap-1">{item.categoria}</p>
                        </div>
                        <div>
                          <span className="flex items-center gap-2 text-xs font-light"><div className={`${item.status == 1 ? 'bg-takeat-success-500' : 'bg-takeat-error-500'} rounded-full h-3 w-3 animate-pulse`}></div> {item.status == 1 ? 'Aberto' : 'Fechado'}</span>
                          <span className="flex items-center gap-2 text-xs font-light mt-1">{item.inicio} as {item.fim}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          })}
        </div>
      </div>


    </section>
  )
}

export default EmblaCarousel