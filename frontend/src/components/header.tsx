import { TiLocation } from "react-icons/ti";

export default function Header() {
  return (
    <div className="flex flex-col gap-3 p-3 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50">
      <div className="flex items-center gap-3">
        <img src="https://takeat-imgs.takeat.app/491e2dd42e4f7090d971fcf6d127079d.png" className="h-16" alt="Takeat App" />
        <div>
          <h2 className="font-medium">Takeat app</h2>
          <p className="text-sm flex items-center gap-1"><TiLocation /> Vila Kennedy, N° 60, Vitória - ES</p>
        </div>
      </div>
      <hr className="text-takeat-black-500 border" />
      <div className="flex items-center mx-3 gap-2 divide-x divide-takeat-gray-500">
        <span className="flex items-center gap-2 text-xs font-light px-2"><div className="bg-takeat-success-500 rounded-full h-3 w-3 animate-pulse"></div> Delivery</span>
        <span className="flex items-center gap-2 text-xs font-light px-2"><div className="bg-takeat-success-500 rounded-full h-3 w-3 animate-pulse"></div> Retirada</span>
        <span className="flex items-center gap-2 text-xs font-light px-2"><div className="bg-takeat-error-500 rounded-full h-3 w-3 animate-pulse"></div> Fechado</span>
      </div>
    </div>
  )
}