import CreateAssignmentForm from '@/components/dashboard/CreateAssignmentForm';
import { getEngineers } from '@/app/api/engineers/route';
import { getProjects } from '@/app/api/projects/route';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ManagerAssignmentsPage() {
  const engineers = await getEngineers();
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAssignmentForm engineers={engineers} projects={projects} />
        </CardContent>
      </Card>
    </div>
  );
}