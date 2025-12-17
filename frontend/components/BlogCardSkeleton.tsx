export default function BlogCardSkeleton() {
  return (
    <div className="bg-white/50 rounded-xl p-6">
      <div className="animate-pulse">
        {/* Title */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        {/* Content */}
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        {/* Read More */}
        <div className="h-4 bg-blue-200 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  )
} 