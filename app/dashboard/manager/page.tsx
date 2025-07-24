'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Users, 
  FolderPlus, 
  UserPlus, 
  Briefcase,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react';
import ChartWrapper from '@/components/dashboard/ChartWrapper';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock data - in a real app, this would come from your API
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const engineerData = [
  { name: 'Alex Chen', skills: ['React', 'Node.js', 'TypeScript'], seniority: 'senior', allocated: 80, maxCapacity: 100, department: 'Frontend' },
  { name: 'Jamie Smith', skills: ['Python', 'Django', 'AWS'], seniority: 'mid', allocated: 40, maxCapacity: 50, department: 'Backend' },
  { name: 'Taylor Brown', skills: ['React', 'CSS', 'UI/UX'], seniority: 'junior', allocated: 70, maxCapacity: 100, department: 'Frontend' },
  { name: 'Jordan Lee', skills: ['Java', 'Spring', 'SQL'], seniority: 'senior', allocated: 60, maxCapacity: 100, department: 'Backend' },
  { name: 'Casey Wilson', skills: ['React Native', 'Mobile'], seniority: 'mid', allocated: 30, maxCapacity: 100, department: 'Mobile' },
];

const projectData = [
  { name: 'Customer Portal', status: 'active', requiredSkills: ['React', 'Node.js'], teamSize: 5, progress: 65 },
  { name: 'Data Analytics', status: 'active', requiredSkills: ['Python', 'SQL'], teamSize: 3, progress: 45 },
  { name: 'Mobile App', status: 'planning', requiredSkills: ['React Native'], teamSize: 4, progress: 15 },
  { name: 'API Gateway', status: 'completed', requiredSkills: ['Java', 'Spring'], teamSize: 3, progress: 100 },
];

const skillDistribution = [
  { name: 'React', count: 8 },
  { name: 'Node.js', count: 5 },
  { name: 'Python', count: 4 },
  { name: 'Java', count: 3 },
  { name: 'SQL', count: 3 },
];

export default function ManagerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if not a manager
  useEffect(() => {
    if (!loading && (!user || user.role !== 'manager')) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading || !user || !isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Calculate team utilization metrics
  const totalCapacity = engineerData.reduce((sum, engineer) => sum + engineer.maxCapacity, 0);
  const totalAllocated = engineerData.reduce((sum, engineer) => sum + engineer.allocated, 0);
  const utilizationRate = Math.round((totalAllocated / totalCapacity) * 100);
  
  const overUtilized = engineerData.filter(e => e.allocated > e.maxCapacity).length;
  const underUtilized = engineerData.filter(e => e.allocated < e.maxCapacity * 0.6).length;
  const wellUtilized = engineerData.length - overUtilized - underUtilized;

  const utilizationData = [
    { name: 'Overutilized', value: overUtilized, color: '#FF8042' },
    { name: 'Well Utilized', value: wellUtilized, color: '#00C49F' },
    { name: 'Underutilized', value: underUtilized, color: '#FFBB28' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/manager/projects/create">
              <FolderPlus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/manager/assignments">
              <UserPlus className="mr-2 h-4 w-4" />
              Assign Engineer
            </Link>
          </Button>
        </div>
      </div>

      {/* Team Utilization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{utilizationRate}%</div>
            <p className="text-sm text-gray-500 mt-1">
              {totalAllocated}/{totalCapacity} units allocated
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Overutilized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{overUtilized}</div>
            <p className="text-sm text-gray-500 mt-1">Engineers at risk</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Well Utilized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{wellUtilized}</div>
            <p className="text-sm text-gray-500 mt-1">Optimal workload</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Underutilized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{underUtilized}</div>
            <p className="text-sm text-gray-500 mt-1">Available capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Utilization Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="h-6 w-6 text-blue-600" />
              Team Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartWrapper>
                {({ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }) => (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={engineerData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="allocated" name="Allocated" fill="#0088FE" />
                      <Bar dataKey="maxCapacity" name="Max Capacity" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </ChartWrapper>
            </div>
          </CardContent>
        </Card>

        {/* Utilization Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-6 w-6 text-green-600" />
              Utilization Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartWrapper>
                {({ PieChart, Pie, Cell, Tooltip, ResponsiveContainer }) => (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={utilizationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {utilizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </ChartWrapper>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Team Skill Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ChartWrapper>
              {({ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }) => (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={skillDistribution}
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Engineers with Skill" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartWrapper>
          </div>
        </CardContent>
      </Card>

      {/* Projects Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Active Projects</CardTitle>
              <Button asChild variant="link" className="text-blue-600">
                <Link href="/dashboard/manager/projects">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectData
                .filter(project => project.status === 'active')
                .map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-gray-600">
                          Team size: {project.teamSize} engineers
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Active
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-1">Required Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {project.requiredSkills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Team Members</CardTitle>
              <Button asChild variant="link" className="text-blue-600">
                <Link href="/dashboard/manager/team">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engineerData.map((engineer, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{engineer.name}</h3>
                      <p className="text-sm text-gray-600">
                        {engineer.seniority} • {engineer.department}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      engineer.allocated > engineer.maxCapacity 
                        ? 'bg-orange-100 text-orange-800' 
                        : engineer.allocated < engineer.maxCapacity * 0.6 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {engineer.allocated}/{engineer.maxCapacity}
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Allocation</span>
                      <span>{engineer.allocated}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          engineer.allocated > engineer.maxCapacity 
                            ? 'bg-orange-500' 
                            : 'bg-blue-600'
                        }`}
                        style={{ 
                          width: `${Math.min(engineer.allocated, 100)}%`,
                          maxWidth: '100%'
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {engineer.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}