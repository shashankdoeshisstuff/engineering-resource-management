import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  if (user.role === 'manager') {
    redirect('/dashboard/manager');
  } else if (user.role === 'engineer') {
    redirect('/dashboard/engineer');
  } else {
    // Fallback for unexpected roles
    redirect('/auth/login');
  }
}