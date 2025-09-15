import AuthButton from '@/components/ui/AuthButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-black text-gray-800">
          Law & Verdict
        </h1>
        
        <AuthButton />
      </div>
    </div>
  );
}
