'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Folder, Calendar, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar({ role }: { role: 'manager' | 'engineer' }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const managerLinks = [
    { name: 'Dashboard', href: '/dashboard/manager', icon: LayoutDashboard },
    { name: 'Team', href: '/dashboard/manager/team', icon: Users },
    { name: 'Projects', href: '/dashboard/manager/projects', icon: Folder },
    { name: 'Assignments', href: '/dashboard/manager/assignments', icon: Calendar },
  ];

  const engineerLinks = [
    { name: 'Dashboard', href: '/dashboard/engineer', icon: LayoutDashboard },
    { name: 'Assignments', href: '/dashboard/engineer/assignments', icon: Calendar },
    { name: 'Profile', href: '/dashboard/engineer/profile', icon: Settings },
  ];

  const links = role === 'manager' ? managerLinks : engineerLinks;

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 w-64">
      <div className="flex flex-col h-full gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
            <span>ERMS</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === link.href
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                }`}
                href={link.href}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 mt-auto">
          <Button variant="outline" className="w-full" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}