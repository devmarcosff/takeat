import { IProducts } from "@/types/Types"

export type ProductsCartProps = {
    products: IProducts[],
    handleRemoveProduct: (id: string) => void
    handleAddProduct: (id: string) => void
}
