import { ISingleRestaurants } from "@/app/[phone]/page";
import { EmblaOptionsType } from "embla-carousel";

export interface CarouselProps {
    restaurants?: ISingleRestaurants[]
    options?: EmblaOptionsType
    loading?: boolean
}