import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Engineering Resource Management</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-sm mb-2">Reviewer Credentials:</h3>
            
            <div className="mb-3">
              <h4 className="font-medium text-blue-600">Manager Account:</h4>
              <p className="text-sm">Email: <span className="font-mono">manager@example.com</span></p>
              <p className="text-sm">Password: <span className="font-mono">manager123</span></p>
            </div>
            
            <div>
              <h4 className="font-medium text-green-600">Engineer Account:</h4>
              <p className="text-sm">Email: <span className="font-mono">engineer1@example.com</span></p>
              <p className="text-sm">Password: <span className="font-mono">engineer1</span></p>
            </div>
          </div>

          <div className="mt-4 text-center text-sm">
            {"Don't have an account?"}{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}