import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function HomePage() {
  const user = await getCurrentUser();
  
  if (user) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Engineering Resource Management System
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {`Efficiently manage your engineering team's assignments, capacity, and project allocations`}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth/login">
            <Button size="lg" className="px-8 py-4 text-lg">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}