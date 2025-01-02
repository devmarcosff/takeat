"use client"
import React, { useState } from "react";
import LoginModal from "@/components/modal/login.modal";

export default function Login() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-3 flex flex-col h-full items-center justify-center gap-16">
      <div className="flex flex-col justify-center items-center">
        <h2>Não conseguimos te identificar</h2>
      </div>

      <div className="flex flex-col items-center w-full justify-between gap-3">
        <button className="flex items-center justify-center bg-takeat-error-50 border-takeat-error-500 border rounded-md p-4 w-full">Cliente</button>
        <button className="flex items-center justify-center bg-takeat-error-50 border-takeat-error-500 border rounded-md p-4 w-full" onClick={() => setOpen(true)}>Restaurante</button>
      </div>

      <LoginModal open={open} setOpen={setOpen} />
    </div>
  )
} 