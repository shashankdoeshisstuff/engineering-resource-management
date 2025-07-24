import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: 'manager' | 'engineer';
  skills: string[];
  seniority?: 'junior' | 'mid' | 'senior';
  maxCapacity: number;
  department?: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['manager', 'engineer'], required: true },
  skills: [{ type: String }],
  seniority: { type: String, enum: ['junior', 'mid', 'senior'] },
  maxCapacity: { type: Number, required: true, default: 100 },
  department: String
});

// Fixed pre-save hook with proper typing
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const user = this as IUser;
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Add comparePassword method
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, (this as IUser).password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);