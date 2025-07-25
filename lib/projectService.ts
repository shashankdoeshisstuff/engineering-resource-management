import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { SerializedProject } from '@/types/project';

interface RawManager {
  _id: unknown;
  name: string;
}

interface RawProject {
  _id: unknown;
  name: string;
  managerId: RawManager | null;
  description?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  requiredSkills?: string[];
  status?: string;
  teamSize?: number;
}

// Helper type guard: checks if value has a toString method
function hasToString(value: unknown): value is { toString: () => string } {
  return (
    value !== null &&
    value !== undefined &&
    typeof (value as object).toString === 'function'
  );
}

function idToString(id: unknown): string {
  if (typeof id === 'string') return id;
  if (hasToString(id)) {
    return id.toString();
  }
  return '';
}


export const getProjects = async (): Promise<SerializedProject[]> => {
  await dbConnect();

  const projects = await Project.find()
    .populate('managerId', 'name')
    .lean<RawProject[]>();

  return projects.map((project) => {
    const manager = project.managerId
      ? {
          _id: idToString(project.managerId._id),
          name: project.managerId.name,
        }
      : { _id: '', name: 'Unknown' };

    return {
      _id: idToString(project._id),
      name: project.name,
      managerId: manager,
      description: project.description ?? '',
      startDate: project.startDate ? new Date(project.startDate) : new Date(0),
      endDate: project.endDate ? new Date(project.endDate) : new Date(0),
      requiredSkills: project.requiredSkills ?? [],
      status: (project.status as 'planning' | 'active' | 'completed') ?? 'planning',
      teamSize: typeof project.teamSize === 'number' ? project.teamSize : 0,  // no any!
    };
  });
};
