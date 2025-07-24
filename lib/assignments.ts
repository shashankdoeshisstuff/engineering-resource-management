import dbConnect from './db';
import Assignment from '@/models/Assignment';
import { getCurrentUser } from './auth';
import { ObjectId } from 'mongodb';

export interface AssignmentData {
  _id: string;
  projectId: {
    _id: string;
    name: string;
    status: string;
  };
  allocationPercentage: number;
  startDate: Date;
  endDate: Date;
  role: string;
}

export async function getMyAssignments(): Promise<AssignmentData[]> {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    
    await dbConnect();
    
    const assignments = await Assignment.aggregate([
      { $match: { engineerId: new ObjectId(user._id) } },
      { $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'project'
        }
      },
      { $unwind: '$project' },
      { $project: {
          _id: 1,
          allocationPercentage: 1,
          startDate: 1,
          endDate: 1,
          role: 1,
          'projectId': '$project._id',
          'project.name': 1,
          'project.status': 1
        }
      }
    ]);
    
    return assignments.map(assignment => ({
      ...assignment,
      _id: assignment._id.toString(),
      projectId: {
        _id: assignment.projectId.toString(),
        name: assignment.project.name,
        status: assignment.project.status
      }
    }));
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
}