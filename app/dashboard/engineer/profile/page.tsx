import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCurrentUser } from '@/app/api/auth/route';

export default async function EngineerProfilePage() {
  const user = await getCurrentUser();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={user?.name} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue={user?.email} disabled />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="skills">Skills (comma separated)</Label>
          <Input id="skills" defaultValue={user?.skills?.join(', ') || ''} />
        </div>
        <div>
          <Label htmlFor="seniority">Seniority Level</Label>
          <Input id="seniority" defaultValue={user?.seniority || ''} />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input id="department" defaultValue={user?.department || ''} />
        </div>
      </div>
      <Button>Save Changes</Button>
    </div>
  );
}