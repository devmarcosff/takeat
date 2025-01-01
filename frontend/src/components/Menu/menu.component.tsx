"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaClipboardList, FaHome, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Menu() {
  const [orderCount, setOrderCount] = useState<number>(0);

  const updateOrderCount = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const totalOrders = storedProducts.length; // Conta o número de objetos no array
    setOrderCount(totalOrders);
  };

  useEffect(() => {
    updateOrderCount();

    const handleProductsUpdated = () => updateOrderCount();
    window.addEventListener("productsUpdated", handleProductsUpdated);

    window.addEventListener("storage", handleProductsUpdated);

    return () => {
      window.removeEventListener("productsUpdated", handleProductsUpdated);
      window.removeEventListener("storage", handleProductsUpdated);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-takeat-white-50 border-t border-takeat-error-400">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <Link
          href={"/"}
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-takeat-error-400 group"
        >
          <FaHome className="w-5 h-5 mb-2 text-takeat-gray-700 group-hover:text-takeat-error-50" />
          <span className="text-xs text-takeat-gray-700 group-hover:text-takeat-error-50">Início</span>
        </Link>
        <Link
          href={"/perfil"}
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-takeat-error-400 group"
        >
          <FaUser className="w-5 h-5 mb-2 text-takeat-gray-700 group-hover:text-takeat-error-50" />
          <span className="text-xs text-takeat-gray-700 group-hover:text-takeat-error-50">Perfil</span>
        </Link>
        <Link
          href={"/carrinho"}
          type="button"
          className="relative inline-flex flex-col items-center justify-center px-5 hover:bg-takeat-error-400 group"
        >
          <FaCartShopping className="w-5 h-5 mb-2 text-takeat-gray-700 group-hover:text-takeat-error-50" />
          {orderCount > 0 && (
            <span className="absolute top-0 right-7 text-xs text-white bg-takeat-error-500 border border-takeat-error-50 shadow-sm rounded-full h-[20] w-[20] flex items-center justify-center">
              {orderCount}
            </span>
          )}
          <span className="text-xs text-takeat-gray-700 group-hover:text-takeat-error-50">Carrinho</span>
        </Link>
        <Link
          href={"/pedidos"}
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-takeat-error-400 group"
        >
          <FaClipboardList className="w-5 h-5 mb-2 text-takeat-gray-700 group-hover:text-takeat-error-50" />
          <span className="text-xs text-takeat-gray-700 group-hover:text-takeat-error-50">Pedidos</span>
        </Link>
      </div>
    </div>
  );
}
