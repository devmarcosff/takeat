"use client"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Loading from '../Loading/loading.restaurants.component'
import { SLIDES } from '../main'
import { CarouselProps } from './carousel.types'

const AdsCarousel: React.FC<CarouselProps> = ({ options, loading, restaurants }) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()])
  const Logo = '/assets/logo_takeat.png'

  return (
    <section className={`max-w-full [--slide-spacing:.5rem] [--slide-size:85%] my-2`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex [touch-action:pan-y] ml-[calc(var(--slide-spacing)*-1)]">
          {loading && SLIDES.map((_, index) => <Loading key={index} />)}

          {restaurants?.map((item, index) => {
            if (item?.status) {
              return (
                <Link href={`/${item?.phone}`} className={`cursor-pointer select-none transform-gpu translate-x-0 translate-y-0 flex-shrink-0 flex-grow-0 min-w-[var(--slide-size)] md:w-1/6 px-[var(--slide-spacing)]`} key={index}>
                  <div className="flex flex-col p-4 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
                    <div className="flex items-center gap-3">
                      <Image width={40} height={40} src={Logo} className="h-10" alt={`${item?.username}`} />
                      <div className="flex items-start gap-3 w-full justify-between">
                        <div>
                          <h2 className="font-medium">{item?.username}</h2>
                          <p className="text-sm flex items-center gap-1">{item?.categoria || 'Geral'}</p>
                        </div>
                        <div>
                          <span className="flex items-center gap-2 text-xs font-light"><div className={`${item?.status == 1 ? 'bg-takeat-success-500' : 'bg-takeat-error-500'} rounded-full h-3 w-3 animate-pulse`}></div> {item?.status == 1 ? 'Aberto' : 'Fechado'}</span>
                          <span className="flex items-center gap-2 text-xs font-light mt-1">{item?.status == 1 ? '08:30 as 22:30' : ''}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            }
          })}
        </div>
      </div>
    </section>
  )
}

export default AdsCarousel