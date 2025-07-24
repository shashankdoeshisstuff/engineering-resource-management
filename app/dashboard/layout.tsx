import { Sidebar } from '@/components/dashboard/Sidebar';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ui/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute allowedRoles={['manager', 'engineer']}>
      <div className="flex h-screen">
        <Sidebar role={user?.role || 'engineer'} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}