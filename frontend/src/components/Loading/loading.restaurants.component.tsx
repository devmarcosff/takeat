import { LoadingProps } from "@/types/Types";

const Loading = ({ dimension }: LoadingProps) => {
  return (
    <div className={`cursor-pointer transform-gpu translate-x-0 ${dimension == true ? 'md:w-full' : 'md:w-1/6'} shadow-sm focus:shadow-none translate-y-0 flex-shrink-0 flex-grow-0 w-[var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]`}>
      <div className="flex flex-col p-4 hover:bg-takeat-gray-300 border rounded-md border-takeat-gray-500 shadow-sm w-full bg-takeat-white-50 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-takeat-gray-400 rounded-md shadow-md"></div>
          <div className="flex items-start w-full justify-between">
            <div className="flex-1">
              <div className="h-4 bg-takeat-gray-400 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-takeat-gray-400 rounded w-1/2"></div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-xs font-light">
                <div className="bg-takeat-gray-400 rounded-full h-3 w-3"></div>
                <div className="h-3 bg-takeat-gray-400 rounded w-16"></div>
              </div>
              <div className="h-3 bg-takeat-gray-400 rounded w-20 mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading