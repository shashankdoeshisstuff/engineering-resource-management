import dbConnect from '@/lib/db';
import Engineer from '@/models/Engineer';
import { SerializedEngineer } from '@/types/engineer';

// Define type for the raw Engineer document returned by lean()
interface RawEngineer {
  _id: unknown; // can be ObjectId or string
  name: string;
  allocated?: number;
  maxCapacity?: number;
  skills?: string[];
  seniority?: string;
  department?: string;
}

export const getEngineers = async (): Promise<SerializedEngineer[]> => {
  await dbConnect();
  // tell TS what shape to expect
  const engineers = await Engineer.find().lean<RawEngineer[]>();

  return engineers.map((engineer) => ({
    _id: typeof engineer._id === 'string' ? engineer._id : (engineer._id as { toString: () => string }).toString(),
    name: engineer.name,
    allocated: engineer.allocated ?? 0,
    maxCapacity: engineer.maxCapacity ?? 100,
    skills: engineer.skills ?? [],
    seniority: engineer.seniority ?? '',
    department: engineer.department ?? '',
  }));
};
