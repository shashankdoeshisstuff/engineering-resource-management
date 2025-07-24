import AuthWrapper from '@/components/auth/AuthWrapper';
import Sidebar from '@/components/dashboard/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper allowedRoles={['manager', 'engineer']}>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </AuthWrapper>
  );
}