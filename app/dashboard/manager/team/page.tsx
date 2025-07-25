import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CapacityBar from '@/components/dashboard/CapacityBar';
import SkillTags from '@/components/dashboard/SkillTags';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getEngineers } from '@/lib/engineerService';

export default async function ManagerTeamPage() {
  const engineers = await getEngineers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Overview</h1>
        <Link href="/dashboard/manager/assignments">
          <Button>Create Assignment</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineers.map(engineer => (
          <Card key={engineer._id.toString()}>
            <CardHeader>
              <CardTitle>{engineer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CapacityBar 
                allocated={engineer.allocated} 
                maxCapacity={engineer.maxCapacity} 
              />
              <div className="mt-4 space-y-2">
                <p><span className="font-medium">Skills:</span></p>
                <SkillTags skills={engineer.skills} />
                <p><span className="font-medium">Seniority:</span> {engineer.seniority}</p>
                <p><span className="font-medium">Department:</span> {engineer.department || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}