import { IRestaurants } from "@/types/Types";
import { EmblaOptionsType } from "embla-carousel";

export interface CarouselProps {
    restaurants?: IRestaurants[]
    options?: EmblaOptionsType
    loading?: boolean
}