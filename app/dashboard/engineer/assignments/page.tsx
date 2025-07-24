import AssignmentsTable from '@/components/dashboard/AssignmentsTable';
import { getMyAssignments } from '@/lib/assignments';

export default async function EngineerAssignmentsPage() {
  const assignments = await getMyAssignments();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Assignments</h1>
      </div>
      
      <AssignmentsTable assignments={assignments} />
      
      {assignments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No assignments found</p>
          <p className="text-sm text-gray-400">
            Contact your manager to get assigned to projects
          </p>
        </div>
      )}
    </div>
  );
}