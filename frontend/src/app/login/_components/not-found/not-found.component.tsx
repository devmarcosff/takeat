import LoginModal from "@/components/modal/login.modal"
import LoginClientModal from "@/components/modal/loginClient.modal"
import { GoAlertFill } from "react-icons/go"
import { NotFoundLoginProps } from "./not-found.types"

export default function NotFoundLogin({ isNotFound, children, open, openClient, handleModalClose, handleOpenClient, setOpen }: NotFoundLoginProps) {
  if (!isNotFound) return children

  return (
    <div className="flex flex-col justify-center h-full w-full items-center gap-10 px-3">
      <div className="flex flex-col justify-center items-center gap-5">
        <GoAlertFill className="size-28 text-takeat-error-400" />
        <h2>Não conseguimos te identificar</h2>
      </div>
      <div className="flex flex-col items-center w-full justify-between gap-3 md:max-w-80">
        <button
          className="flex items-center justify-center transition-all bg-takeat-error-50 border-takeat-error-500 hover:bg-takeat-error-400 hover:text-white hover:border-takeat-error-50 border rounded-md p-4 w-full"
          onClick={() => handleOpenClient()}
        >
          Cliente
        </button>
        <button
          className="flex items-center justify-center transition-all bg-takeat-error-50 border-takeat-error-500 hover:bg-takeat-error-400 hover:text-white hover:border-takeat-error-50 border rounded-md p-4 w-full"
          onClick={() => setOpen(true)}
        >
          Restaurante
        </button>
      </div>

      <LoginModal open={open} setOpen={handleModalClose} />
      <LoginClientModal openClient={openClient} setOpenClient={handleModalClose} />
    </div>
  )
}