import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  requiredSkills: string[];
  teamSize: number;
  status: 'planning' | 'active' | 'completed';
  managerId: mongoose.Schema.Types.ObjectId;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  requiredSkills: [{ type: String }],
  teamSize: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['planning', 'active', 'completed'], 
    default: 'planning' 
  },
  managerId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  }
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);