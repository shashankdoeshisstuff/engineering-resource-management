import AssignmentsTable from '@/components/dashboard/AssignmentsTable';
import { getMyAssignments } from '@/app/api/assignments/route';

export default async function EngineerAssignmentsPage() {
  const assignments = await getMyAssignments();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Assignments</h1>
      <AssignmentsTable assignments={assignments} />
    </div>
  );
}