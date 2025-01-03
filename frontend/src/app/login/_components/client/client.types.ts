import { BuyerProps, OrderProps } from "@/types/Types"

export type ClientLoginProps = {
    userClient?: {
        username?: string,
        phone: string
    },
    orders?: OrderProps[],
    orderRestaurant?: BuyerProps
}
