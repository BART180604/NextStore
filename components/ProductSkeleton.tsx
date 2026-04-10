import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-zinc-100"></div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-2 w-16 bg-zinc-100 rounded"></div>
          <div className="h-4 w-full bg-zinc-100 rounded"></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-6 w-20 bg-zinc-100 rounded"></div>
          <div className="h-3 w-12 bg-zinc-100 rounded"></div>
        </div>

        <div className="h-10 w-full bg-zinc-100 rounded-xl"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
