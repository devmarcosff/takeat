"use client"
import { FaTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { RiSubtractLine } from "react-icons/ri";
import { ProductsCartProps } from "./products.types";

export default function ProductsCart({ products, handleAddProduct, handleRemoveProduct }: ProductsCartProps) {
  if (!products.length) return null

  return (
    <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50 divide-y divide-takeat-error-400/30">
      {products.map((product) => (
        <div key={product.id} >
          <div className="flex justify-between items-center py-2">
            <div>
              <h3 className="text-md font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pb-3">
            <p className="text-sm mt-1 font-medium">
              {product.quantities} x R$ {(product.value ?? 0).toFixed(2)}
            </p>
            <div className="flex items-center justify-center gap-2 border border-takeat-gray-500 rounded-sm shadow-sm w-28 px-4 py-2">
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className={`px-2 rounded-md text-takeat-error-500`}
              >
                {
                  product.quantities === 1 ? <FaTrashAlt className="text-sm" /> : <RiSubtractLine className="text-sm" />
                }
              </button>
              <span className="text-sm font-medium">{product.quantities}</span>
              <button
                onClick={() => handleAddProduct(product.id)}
                className={`px-2 rounded-md text-takeat-error-500 text-sm`}
              >
                <FiPlus />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}