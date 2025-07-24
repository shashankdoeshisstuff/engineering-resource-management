import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Assignment } from '@/models/Assignment';
import { format } from 'date-fns';

export default function AssignmentsTable({ assignments }: { assignments: Assignment[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Allocation</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={assignment._id.toString()}>
            <TableCell>{assignment.projectId.name}</TableCell>
            <TableCell>{assignment.role}</TableCell>
            <TableCell>{assignment.allocationPercentage}%</TableCell>
            <TableCell>{format(new Date(assignment.startDate), 'MMM dd, yyyy')}</TableCell>
            <TableCell>{format(new Date(assignment.endDate), 'MMM dd, yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}