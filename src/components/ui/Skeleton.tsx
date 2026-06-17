interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle' | 'card';
  width?: string;
  height?: string;
}

export function Skeleton({ className = '', variant = 'rect', width, height }: SkeletonProps) {
  const variants: Record<string, string> = {
    text: 'h-4 rounded',
    rect: 'rounded-lg',
    circle: 'rounded-full',
    card: 'rounded-xl h-48',
  };

  return (
    <div
      className={`
        bg-gradient-to-r from-card via-card-hover to-card
        animate-shimmer
        ${variants[variant]}
        ${className}
      `}
      style={{ width, height }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function RankCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <Skeleton variant="circle" className="h-16 w-16 mx-auto" />
      <Skeleton className="h-6 w-24 mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
      <div className="space-y-2">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-3 w-full" />)}
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function LeaderboardSkeleton() {
  return (
    <div className="space-y-2">
      {[1,2,3,4,5,6,7,8,9,10].map(i => (
        <div key={i} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
          <Skeleton variant="circle" className="h-8 w-8" />
          <Skeleton className="h-4 w-32 flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
