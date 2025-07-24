// components/dashboard/ChartSkeleton.tsx
export default function ChartSkeleton() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" />
    </div>
  );
}