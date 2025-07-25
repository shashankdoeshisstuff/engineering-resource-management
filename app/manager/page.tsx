import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CapacityBar from '@/components/dashboard/CapacityBar';
import { getEngineers } from '@/lib/engineerService';

export default async function ManagerDashboard() {
  const engineers = await getEngineers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineers.map(engineer => (
          <Card key={engineer._id}>
            <CardHeader>
              <CardTitle>{engineer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CapacityBar allocated={engineer.allocated} maxCapacity={engineer.maxCapacity} />
              <div className="mt-4">
                <p>Skills: {engineer.skills.join(', ')}</p>
                <p>Seniority: {engineer.seniority}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}