import Image from "next/image";
import Link from "next/link";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { FaClipboardList, FaInstagram, FaMoneyBill } from "react-icons/fa";
import { LuCircleHelp } from "react-icons/lu";
import { MdHelp, MdOutlineHelp } from "react-icons/md";

export default function FooterCart() {
  return (
    <div className="fixed bottom-0 w-full bg-takeat-white-50">
      <div className="flex items-center justify-between p-5 relative">
        <button className="items-center justify-center flex flex-col text-sm gap-2">
          <MdHelp className="size-5 text-takeat-error-400" />
          <span>Ajuda</span>
        </button>
        <button className="items-center justify-center flex flex-col text-sm gap-2">
          <BiLogoInstagramAlt className="size-5 text-takeat-error-400" />
          <span>Siga-nos</span>
        </button>
        <button className="items-center justify-center flex flex-col text-sm gap-2">
          <div className="bg-takeat-error-400 hover:bg-takeat-error-500 transition-all absolute -top-5 h-20 w-20 rounded-full flex items-center justify-center p-3"><Image src="https://pedido.takeat.app/static/media/iconTake.64d65b59.svg" className="h-full" alt="Takeat App" /></div>
        </button>
        <button className="items-center justify-center flex flex-col text-sm gap-2">
          <FaMoneyBill className="size-5 text-takeat-error-400" />
          <span>Cashback</span>
        </button>
        <button className="items-center justify-center flex flex-col text-sm gap-2">
          <FaClipboardList  className="size-5 text-takeat-error-400" />
          <span>Pedidos</span>
        </button>
      </div>
    </div>
  )
}