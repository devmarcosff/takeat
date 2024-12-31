"use client"

import React, { useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Restaurants from './Restaurants/Restaurants'
import AdsCarousel from './Carousel/AdsCarousel'
import axios from 'axios'
import { IRestaurants } from '@/types/Types'

const SLIDE_COUNT = 10
export const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function MainApp() {

  const [restaurants, setRestaurants] = useState<IRestaurants[]>([]);
  const [loading, setLoading] = useState(true);

  const OPTIONS: EmblaOptionsType = { align: 'start', loop: restaurants.length > 1 ? true : false }

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get<IRestaurants[]>('http://localhost:8000/restaurants');
        setRestaurants(res.data);
        setLoading(false);
      } catch (error) {
        console.log(`Erro ao buscar os restaurantes: ${error}`);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <AdsCarousel loading={loading} restaurants={restaurants} options={OPTIONS} />

      <Restaurants loading={loading} restaurants={restaurants} />
    </div>
  )
}