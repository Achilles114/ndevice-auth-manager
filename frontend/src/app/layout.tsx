import { UserProvider } from '@auth0/nextjs-auth0/client';

import './globals.css';

export const metadata = {
  title: 'Law & Verdict - Professional Legal Services',
  description: 'Expert legal representation with integrity and dedication to justice.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-black text-white flex flex-col">
        <UserProvider>
          
          <main className="flex-1">
            {children}
          </main>
         
        </UserProvider>
      </body>
    </html>
  );
}
