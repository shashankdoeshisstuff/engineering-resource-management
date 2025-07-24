import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Assignment from '@/models/Assignment';
import { getCurrentUser } from '@/app/api/auth/route';

export async function GET() {
  await dbConnect();
  const user = await getCurrentUser();
  let assignments;
  
  if (user?.role === 'manager') {
    assignments = await Assignment.find()
      .populate('engineerId', 'name email skills seniority')
      .populate('projectId', 'name status');
  } else {
    assignments = await Assignment.find({ engineerId: user?._id })
      .populate('projectId', 'name status');
  }
  
  return NextResponse.json(assignments);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const assignment = await Assignment.create(data);
  return NextResponse.json(assignment, { status: 201 });
}