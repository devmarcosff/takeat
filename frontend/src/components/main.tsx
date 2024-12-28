"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './carousel/EmblaCarousel'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function MainApp() {
  const [emblaRef] = useEmblaCarousel()
  return (
    <div>

      {/* Restaurantes */}
      {/* <div className="m-2 flex items-center justify-between p-2 pr-5 bg-white rounded-md shadow-sm border border-takeat-gray-500">
        <h2>Os melhores restaurantes</h2>
        <IoIosArrowForward />
      </div> */}
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  )
}