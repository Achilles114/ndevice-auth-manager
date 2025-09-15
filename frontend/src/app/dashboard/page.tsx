'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Dashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">You need to be logged in to view this page.</p>
        <a href="/api/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded border">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        
        </div>
      </div>
      
      <div className="bg-white p-6 rounded border">
        <h2 className="text-xl font-bold mb-4">Active Sessions</h2>
        <p className="text-gray-600">Session management will be implemented here...</p>
      </div>
    </div>
  );
}
