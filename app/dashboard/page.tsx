import { getCurrentUser } from '@/app/api/auth/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (user?.role === 'manager') {
    redirect('/dashboard/manager');
  } else if (user?.role === 'engineer') {
    redirect('/dashboard/engineer');
  } else {
    redirect('/auth/login');
  }
}