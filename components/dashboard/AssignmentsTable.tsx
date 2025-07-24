import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

export interface Assignment {
  _id: string;
  projectId: {
    _id: string;
    name: string;
    status: string;
  };
  allocationPercentage: number;
  startDate: Date;
  endDate: Date;
  role: string;
}

interface AssignmentsTableProps {
  assignments: Assignment[];
}

export default function AssignmentsTable({ assignments }: AssignmentsTableProps) {
  const daysLeft = (endDate: Date) => {
    const diff = endDate.getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Allocation</TableHead>
          <TableHead>Timeline</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={assignment._id}>
            <TableCell className="font-medium">{assignment.projectId.name}</TableCell>
            <TableCell>{assignment.role}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${assignment.allocationPercentage}%` }}
                  ></div>
                </div>
                <span>{assignment.allocationPercentage}%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                {format(assignment.startDate, 'MMM dd, yyyy')} - {format(assignment.endDate, 'MMM dd, yyyy')}
              </div>
              <div className="text-xs text-gray-500">
                {daysLeft(assignment.endDate)} days left
              </div>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 text-xs rounded-full ${
                assignment.projectId.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : assignment.projectId.status === 'completed'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {assignment.projectId.status.charAt(0).toUpperCase() + assignment.projectId.status.slice(1)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}