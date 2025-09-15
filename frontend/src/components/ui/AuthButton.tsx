'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AuthButton() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? (
    // User is logged in - show welcome message and logout
    <div className="flex flex-col items-center space-y-6">
      <span className="text-gray-700 font-medium text-lg">Hello {user.name}!</span>
      <button 
        type="button"
        onClick={() => window.location.href = '/api/auth/logout'}
        className="inline-flex items-center justify-center py-2 px-4 xl:px-8 rounded-full font-medium transition-all duration-200 shadow-sm border-2 bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
      >
        Logout
      </button>
    </div>
  ) : (
    // User is NOT logged in - show login button and signup link
    <div className="flex flex-col items-center space-y-6">
      <button 
        type="button"
        onClick={() => window.location.href = '/api/auth/login'}
        className="inline-flex items-center justify-center py-3 px-8 xl:px-12 rounded-full font-medium transition-all duration-200 shadow-sm border-2 bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
      >
        Login
      </button>
      
      <p className="text-gray-700 text-sm">
        Don't have an account?{' '}
        <button
          onClick={() => window.location.href = '/api/auth/login'}
          className="text-blue-600 hover:text-blue-500 font-medium transition-colors underline bg-transparent border-none cursor-pointer"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
