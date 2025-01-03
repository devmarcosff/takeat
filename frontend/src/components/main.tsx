"use client"

import { ISingleRestaurants } from '@/app/[phone]/page'
import axios from 'axios'
import { EmblaOptionsType } from 'embla-carousel'
import { useEffect, useState } from 'react'
import AdsCarousel from './carousel/add-carousel'
import Restaurants from './restaurants/Restaurants'

const SLIDE_COUNT = 10
export const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function MainApp() {

  const [restaurants, setRestaurants] = useState<ISingleRestaurants[]>([]);
  const [loading, setLoading] = useState(true);

  const OPTIONS: EmblaOptionsType = { align: 'start', loop: restaurants.length > 1 ? true : false }

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        await axios.get<ISingleRestaurants[]>(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`).then((res) => {
          setRestaurants(res.data)
        })
        setLoading(false);
      } catch (error) {
        console.log(`Erro ao buscar os restaurantes: ${error}`);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className='pb-20'>
      <AdsCarousel loading={loading} restaurants={restaurants} options={OPTIONS} />
      <Restaurants loading={loading} restaurants={restaurants} />
    </div>
  )
}