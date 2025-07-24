import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Assignment from '@/models/Assignment';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  
  // Get active assignments for the engineer
  const activeAssignments = await Assignment.find({ 
    engineerId: new ObjectId(id),
    endDate: { $gte: new Date() } 
  });
  
  // Calculate total allocated percentage
  const totalAllocated = activeAssignments.reduce((sum, assignment) => 
    sum + assignment.allocationPercentage, 0);
  
  // Get engineer's max capacity
  const engineer = await User.findById(id);
  
  return NextResponse.json({
    allocated: totalAllocated,
    available: engineer.maxCapacity - totalAllocated,
    maxCapacity: engineer.maxCapacity
  });
}