import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Assignment from '@/models/Assignment';

export async function GET() {
  await dbConnect();
  const engineers = await User.find({ role: 'engineer' }).select('-password').lean();
  
  // Calculate allocated capacity for each engineer
  const engineersWithCapacity = await Promise.all(engineers.map(async (engineer) => {
    const activeAssignments = await Assignment.find({ 
      engineerId: engineer._id,
      endDate: { $gte: new Date() } 
    });
    
    const allocated = activeAssignments.reduce((sum, assignment) => 
      sum + assignment.allocationPercentage, 0);
    
    return {
      ...engineer,
      allocated
    };
  }));
  
  return NextResponse.json(engineersWithCapacity);
}