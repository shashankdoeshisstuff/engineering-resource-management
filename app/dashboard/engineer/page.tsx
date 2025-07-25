import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CapacityBar from '@/components/dashboard/CapacityBar';
import SkillTags from '@/components/dashboard/SkillTags';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarDays, UserRound, Briefcase } from 'lucide-react';

export default async function EngineerDashboard() {
  const user = await getCurrentUser();
  
  // Redirect if not an engineer
  if (!user || user.role !== 'engineer') {
    redirect('/auth/login');
  }

  // Mock assignments data - in a real app, this would come from an API
  const assignments = [
    {
      id: '1',
      project: 'Customer Portal Redesign',
      role: 'Frontend Developer',
      allocation: 60,
      startDate: new Date('2023-10-01'),
      endDate: new Date('2024-02-28'),
      status: 'active'
    },
    {
      id: '2',
      project: 'Mobile App Development',
      role: 'UI Developer',
      allocation: 40,
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-04-30'),
      status: 'planning'
    }
  ];

  // Calculate total allocation
  const totalAllocation = assignments.reduce((sum, assignment) => sum + assignment.allocation, 0);
  const availableCapacity = user.maxCapacity - totalAllocation;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Engineer Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/engineer/profile">
              <UserRound className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/engineer/assignments">
              <Briefcase className="mr-2 h-4 w-4" />
              View All Assignments
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-6 w-6 text-blue-600" />
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              
              <div>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Role:</span> 
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {user.role}
                  </span>
                </p>
                <p className="flex items-center gap-2 mt-1">
                  <span className="font-medium">Seniority:</span> 
                  <span className="capitalize">{user.seniority}</span>
                </p>
                <p className="flex items-center gap-2 mt-1">
                  <span className="font-medium">Capacity:</span> 
                  {user.maxCapacity === 100 ? 'Full-time' : 'Part-time'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Skills</h4>
                <SkillTags skills={user.skills || []} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capacity Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-green-600" />
              My Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CapacityBar 
                allocated={totalAllocation} 
                maxCapacity={user.maxCapacity} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Current Workload</h3>
                  <p className="text-2xl font-bold text-blue-600">{totalAllocation}%</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Allocated to {assignments.length} projects
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Available Capacity</h3>
                  <p className="text-2xl font-bold text-green-600">{availableCapacity}%</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Free for new assignments
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allocation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{assignment.project}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {assignment.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${assignment.allocation}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {assignment.allocation}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        <div className="text-sm">
                          {format(assignment.startDate, 'MMM dd, yyyy')} - {format(assignment.endDate, 'MMM dd, yyyy')}
                        </div>
                        <div className="text-xs text-gray-400">
                          {Math.ceil((assignment.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          assignment.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">No current assignments</div>
              <Button asChild>
                <Link href="/dashboard/engineer/assignments">
                  View Available Projects
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Data Analytics Platform</h3>
                <p className="text-sm text-gray-600">Starts on Jan 15, 2024</p>
              </div>
              <div>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Planning
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Required Skills:</span> Python, SQL, Data Visualization
              </p>
              <div className="mt-2 flex gap-1">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                  Python
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                  SQL
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                  Data Visualization
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}