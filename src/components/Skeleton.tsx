import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export default function Skeleton({ className, variant = 'rect' }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-white/5",
        variant === 'circle' ? "rounded-full" : "rounded-lg",
        className
      )}
    />
  );
}

export function ArenaSkeleton() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <div className="h-20 border-b border-primary/10 bg-background-dark/50 p-4 flex items-center justify-between">
        <Skeleton className="w-24 h-8" />
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-24 h-8" />
      </div>
      <div className="flex-1 p-8 space-y-12 max-w-md mx-auto w-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={clsx("flex flex-col items-center gap-4", i % 2 === 0 ? "ml-20" : "mr-20")}>
            <Skeleton variant="circle" className="w-20 h-20" />
            <Skeleton className="w-32 h-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LabsSkeleton() {
  return (
    <div className="min-h-screen bg-background-dark p-4 space-y-6 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="w-40 h-8" />
        <Skeleton variant="circle" className="w-10 h-10" />
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-surface-dark/50 border border-white/5">
          <Skeleton className="w-14 h-14 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background-dark p-4 space-y-8 max-w-md mx-auto w-full">
      <div className="flex flex-col items-center space-y-4 pt-8">
        <Skeleton variant="circle" className="w-24 h-24" />
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-24 h-4" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-20 rounded-2xl" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </div>
  );
}
