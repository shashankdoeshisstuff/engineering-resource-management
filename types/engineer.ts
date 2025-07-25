export type SerializedEngineer = {
  _id: string;
  name: string;
  allocated: number;
  maxCapacity: number;
  skills: string[];
  seniority: string;
  department?: string;
};