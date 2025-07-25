import AssignmentsTable from '@/components/dashboard/AssignmentsTable';
import { getMyAssignments } from '@/lib/assignments';

export default async function EngineerDashboard() {
  const assignments = await getMyAssignments();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Assignments</h1>
      <AssignmentsTable assignments={assignments} />
    </div>
  );
}