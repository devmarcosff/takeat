import { ISingleRestaurants } from "@/app/[phone]/page";

export interface RestaurantProps {
    restaurants?: ISingleRestaurants[]
    loading?: boolean
}