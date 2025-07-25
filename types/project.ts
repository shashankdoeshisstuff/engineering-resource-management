export type SerializedProject = {
  _id: string;
  name: string;
  managerId: {
    _id: string;
    name: string;
  };
  description: string;
  startDate: Date;
  endDate: Date;
  requiredSkills: string[];
  teamSize: number;
  status: 'planning' | 'active' | 'completed';
};