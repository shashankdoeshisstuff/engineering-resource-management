import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SerializedProject } from '@/types/project';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ProjectsTable({ projects }: { projects: SerializedProject[] }) {
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
        {projects.map((project, index) => (
          <TableRow key={(project._id ?? index).toString()}>
            <TableCell>
              <Link
                href={`/dashboard/manager/projects/${project._id ?? ''}`}
                className="font-medium hover:underline"
              >
                {project.name ?? 'Untitled Project'}
              </Link>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {project.status ?? 'Unknown'}
              </span>
            </TableCell>
            <TableCell>
              {project.startDate ? format(new Date(project.startDate), 'MMM dd, yyyy') : 'N/A'}
            </TableCell>
            <TableCell>
              {project.endDate ? format(new Date(project.endDate), 'MMM dd, yyyy') : 'N/A'}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {(project.requiredSkills ?? []).map((skill: string) => (
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
