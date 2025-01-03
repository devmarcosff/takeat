import Link from "next/link";
import { NotFoundCartProps } from "./not-Found.types"
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

export default function NotFoundCart({ isNotFound, children }: NotFoundCartProps) {
  if (!isNotFound) return children

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <div className="flex items-center justify-normal p-5 rounded-full border-4 border-takeat-error-400 shadow-md">
        <MdOutlineProductionQuantityLimits className="size-20 text-takeat-error-400" />
      </div>

      <p>Ainda não existe nenhum produto no carrinho.</p>

      <Link href={'/'} className="p-2 bg-takeat-error-400 rounded-md text-white shadow-md hover:bg-takeat-error-500 transition-all">Ralizar Pedido</Link>
    </div>
  )
}