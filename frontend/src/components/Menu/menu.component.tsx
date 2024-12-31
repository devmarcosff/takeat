import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaClipboardList, FaHome, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Menu() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-takeat-white-50 border-t border-takeat-error-400">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <Link href={'/'} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-takeat-error-400 group">
          <FaHome className="w-5 h-5 mb-2 text-takeat-error-400 group-hover:text-takeat-error-50" />
          <span className="text-xs text-takeat-error-400 group-hover:text-takeat-error-50">Início</span>
        </Link>
        <Link href={'/perfil'} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-takeat-error-400 group">
          <FaUser className="w-5 h-5 mb-2 text-takeat-error-400 group-hover:text-takeat-error-50" />
          <span className="text-xs text-takeat-error-400 group-hover:text-takeat-error-50">Perfil</span>
        </Link>
        <Link href={'/carrinho'} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-takeat-error-400 group">
          <FaCartShopping className="w-5 h-5 mb-2 text-takeat-error-400 group-hover:text-takeat-error-50" />
          <span className="text-xs text-takeat-error-400 group-hover:text-takeat-error-50">Carrinho</span>
        </Link>
        <Link href={'/pedidos'} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-takeat-error-400 group">
          <FaClipboardList className="w-5 h-5 mb-2 text-takeat-error-400 group-hover:text-takeat-error-50" />
          <span className="text-xs text-takeat-error-400 group-hover:text-takeat-error-50">Pedidos</span>
        </Link>
      </div>
    </div>
  )
}