"use client"

import React, { useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import axios from 'axios'
import { IRestaurants } from '@/types/Types'
import Restaurants from './restaurants/restaurants'
import AdsCarousel from './carousel/add-carousel'

const SLIDE_COUNT = 10
export const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function MainApp() {

  const [restaurants, setRestaurants] = useState<IRestaurants[]>([]);
  const [loading, setLoading] = useState(true);

  const OPTIONS: EmblaOptionsType = { align: 'start', loop: restaurants.length > 1 ? true : false }

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get<IRestaurants[]>(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`);
        setRestaurants(res.data);
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