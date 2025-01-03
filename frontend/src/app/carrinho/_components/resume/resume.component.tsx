import { ResumeCartProps } from "./resume.types";

export default function ResumeCart({ total, subTotal, totalWithServiceTax }: ResumeCartProps) {
  return (
    <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50">
      <h2 className="text-lg font-medium mb-2">Resumo</h2>
      <div className="flex justify-between text-sm">
        <span>Subtotal:</span>
        <span>R$ {subTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Taxa do restaurante:</span>
        <span>R$ {Number(totalWithServiceTax - total).toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Total:</span>
        <span>R$ {totalWithServiceTax.toFixed(2)}</span>
      </div>
    </div>
  )
}