import ProjectsTable from '@/components/dashboard/ProjectsTable';
import { getProjects } from '@/app/api/projects/route';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ManagerProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/dashboard/manager/projects/create">
          <Button>Create Project</Button>
        </Link>
      </div>
      <ProjectsTable projects={projects} />
    </div>
  );
}