import { Progress } from '@/components/ui/progress';

export default function CapacityBar({ allocated, maxCapacity }: { 
  allocated: number; 
  maxCapacity: number 
}) {
  const available = maxCapacity - allocated;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Allocated: {allocated}%</span>
        <span>Available: {available}%</span>
      </div>
      <Progress value={(allocated / maxCapacity) * 100} />
      <div className="text-xs text-gray-500">
        Max Capacity: {maxCapacity}% ({maxCapacity === 100 ? 'Full-time' : 'Part-time'})
      </div>
    </div>
  );
}