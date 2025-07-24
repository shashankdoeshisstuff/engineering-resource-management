import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Project } from '@/models/Project';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Required Skills</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project._id.toString()}>
            <TableCell>
              <Link href={`/dashboard/manager/projects/${project._id}`} className="font-medium hover:underline">
                {project.name}
              </Link>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {project.status}
              </span>
            </TableCell>
            <TableCell>{format(new Date(project.startDate), 'MMM dd, yyyy')}</TableCell>
            <TableCell>{format(new Date(project.endDate), 'MMM dd, yyyy')}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {project.requiredSkills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}