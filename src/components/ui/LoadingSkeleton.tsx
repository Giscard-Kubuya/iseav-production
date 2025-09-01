import React from "react";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "hero" | "image" | "list";
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = "",
  variant = "card",
  count = 1,
}) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded";

  const variants = {
    hero: "h-96 w-full",
    card: "h-64 w-full",
    image: "h-48 w-full",
    text: "h-4 w-3/4",
    list: "h-16 w-full",
  };

  const elements = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    />
  ));

  if (count === 1) {
    return elements[0];
  }

  return <div className="space-y-4">{elements}</div>;
};

// Specific skeleton components for common patterns
export const HeroSkeleton = () => (
  <div className="relative h-screen bg-gray-200 animate-pulse">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-12 w-96 bg-gray-300 rounded mx-auto"></div>
        <div className="h-6 w-80 bg-gray-300 rounded mx-auto"></div>
        <div className="h-4 w-96 bg-gray-300 rounded mx-auto"></div>
        <div className="flex gap-4 justify-center mt-8">
          <div className="h-12 w-32 bg-gray-300 rounded"></div>
          <div className="h-12 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

export const NewsSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

export const TeamMemberSkeleton = () => (
  <div className="text-center animate-pulse">
    <div className="relative mx-auto w-48 h-48 mb-6 bg-gray-200 rounded-full"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
  </div>
);

export const ServiceSkeleton = () => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse">
    <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6 mx-auto"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto"></div>
    </div>
  </div>
);

export const StatsSkeleton = () => (
  <div className="text-center p-6 bg-white rounded-lg shadow-lg animate-pulse">
    <div className="h-12 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
  </div>
);