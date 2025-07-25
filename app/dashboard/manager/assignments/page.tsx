import CreateAssignmentForm from '@/components/dashboard/CreateAssignmentForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getEngineers } from '@/lib/engineerService';
import { getProjects } from '@/lib/projectService';
import { SerializedEngineer } from '@/types/engineer';
import { SerializedProject } from '@/types/project';

export default async function ManagerAssignmentsPage() {
  const engineers: SerializedEngineer[] = await getEngineers();
  const projects: SerializedProject[] = await getProjects();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAssignmentForm 
            engineers={engineers} 
            projects={projects} 
          />
        </CardContent>
      </Card>
    </div>
  );
}