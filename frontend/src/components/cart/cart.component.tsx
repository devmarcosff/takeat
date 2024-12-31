import { IProducts } from "@/types/Types";

export default function Cart(addCart: IProducts) {
  return (
    <div className="fixed bottom-16 h-12 bg-takeat-error-400 w-full flex items-center justify-between">
      <div className="">
        <h2 className="text-white">1</h2>
      </div>
    </div>
  )
}