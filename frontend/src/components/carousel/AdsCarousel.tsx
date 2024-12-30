"use client"
import React, { useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import axios from 'axios';
import { IRestaurants, PropType } from '@/types/Types'
import Loading from '../loading/Loading'
import { SLIDES } from '../main'
import Image from 'next/image'

const AdsCarousel: React.FC<PropType> = (props) => {
  const { options, loading, restaurants } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  return (
    <section className={`max-w-full [--slide-spacing:.5rem] [--slide-size:85%] ml-2 my-2`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex [touch-action:pan-y] ml-[calc(var(--slide-spacing)*-1)]">
          {loading && SLIDES.map((_, index) => <Loading key={index} />)}

          {restaurants?.map((item, index) => {
            return (
              <div className="cursor-pointer select-none transform-gpu translate-x-0 translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] md:w-1/6 min-w-0 pl-[var(--slide-spacing)]" key={index}>
                <div className="flex flex-col p-4 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AdsCarousel