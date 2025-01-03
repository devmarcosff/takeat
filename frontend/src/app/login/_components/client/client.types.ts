import { BuyerProps, OrderProps } from "@/types/Types"

export type ClientLoginProps = {
    userClient?: {
        name?: string,
        phone: string
    },
    orders?: OrderProps[],
    orderRestaurant?: BuyerProps
}
