"use client"
import { useState } from "react";
import { TiLocation } from "react-icons/ti";

export default function Header() {
  const [loading, setLoading] = useState(false);

  if (loading) return (
    <div className="flex flex-col gap-3 p-3 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 bg-takeat-gray-400 rounded-md"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-takeat-gray-400 rounded w-32"></div>
          <div className="h-3 bg-takeat-gray-400 rounded w-64"></div>
        </div>
      </div>
      <hr className="text-takeat-black-500 border" />
      <div className="flex items-center mx-3 gap-2 divide-x divide-takeat-gray-500">
        <span className="flex items-center gap-2 text-xs font-light px-2">
          <div className="bg-takeat-gray-400 rounded-full h-3 w-3"></div>
          <div className="h-3 bg-takeat-gray-400 rounded w-16"></div>
        </span>
        <span className="flex items-center gap-2 text-xs font-light px-2">
          <div className="bg-takeat-gray-400 rounded-full h-3 w-3"></div>
          <div className="h-3 bg-takeat-gray-400 rounded w-16"></div>
        </span>
        <span className="flex items-center gap-2 text-xs font-light px-2">
          <div className="bg-takeat-gray-400 rounded-full h-3 w-3"></div>
          <div className="h-3 bg-takeat-gray-400 rounded w-16"></div>
        </span>
      </div>
    </div>
  )

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