import { Document, Schema, model, models } from 'mongoose';

export interface IEngineer extends Document {
  name: string;
  allocated: number;
  maxCapacity: number;
  skills: string[];
  seniority: string;
  department?: string;
}

const EngineerSchema = new Schema<IEngineer>({
  name: { type: String, required: true },
  allocated: { type: Number, default: 0 },
  maxCapacity: { type: Number, default: 100 },
  skills: [{ type: String }],
  seniority: { 
    type: String, 
    enum: ['Junior', 'Mid', 'Senior', 'Lead'], 
    required: true 
  },
  department: String
}, { timestamps: true });

export default models.Engineer || model<IEngineer>('Engineer', EngineerSchema);