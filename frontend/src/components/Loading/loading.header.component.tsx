export default function LoadingHeader() {
  return (
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
}