import { LoadingCartProps } from "./loading.types";

export default function LoadingCart({ isLoading, children }: LoadingCartProps) {
  if (!isLoading) return children

  return (
    <div className="space-y-4">
      <div className="mb-4 p-4 border border-takeat-error-400/30 rounded bg-gray-50 animate-pulse">
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="h-5 bg-gray-300 rounded w-2/5"></div>
          <div className="flex items-center gap-2 w-full justify-end">
            <div className="bg-gray-300 rounded-full h-3 w-3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-300 rounded mt-2 w-3/4"></div>
        <div className="flex items-center justify-between gap-3 mt-4">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>

      <div className="animate-pulse bg-gray-50 p-4 border border-takeat-error-400/30 rounded divide-y divide-takeat-error-400/30">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-2 flex flex-col gap-3">
            <div>
              <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/3"></div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="animate-pulse bg-gray-50 p-4 border border-takeat-error-400/30 rounded flex items-end gap-5">
        <div className="flex w-full flex-col">
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="flex w-full flex-col items-end">
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>

      <div className="animate-pulse">
        <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  )
}