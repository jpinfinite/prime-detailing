export function ArticleCardSkeleton() {
  return (
    <div className="bg-prime-gray-medium rounded-lg border border-prime-gray-light overflow-hidden animate-pulse">
      <div className="relative h-48 bg-prime-gray-light"></div>
      <div className="p-6">
        <div className="h-4 bg-prime-gray-light rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-prime-gray-light rounded w-full mb-2"></div>
        <div className="h-3 bg-prime-gray-light rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-prime-gray-light rounded w-24"></div>
      </div>
    </div>
  );
}

export function ArticleListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArticleContentSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-12 bg-prime-gray-light rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-prime-gray-light rounded w-1/2 mb-8"></div>
      <div className="h-96 bg-prime-gray-light rounded mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-prime-gray-light rounded w-full"></div>
        <div className="h-4 bg-prime-gray-light rounded w-full"></div>
        <div className="h-4 bg-prime-gray-light rounded w-3/4"></div>
      </div>
    </div>
  );
}
