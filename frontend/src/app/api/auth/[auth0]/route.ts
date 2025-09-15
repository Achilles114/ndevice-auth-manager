import { handleAuth } from '@auth0/nextjs-auth0';

export async function GET(request: Request, { params }: { params: Promise<{ auth0: string }> }) {
  const { auth0 } = await params;
  return handleAuth()(request, { params: { auth0 } });
}

export async function POST(request: Request, { params }: { params: Promise<{ auth0: string }> }) {
  const { auth0 } = await params;
  return handleAuth()(request, { params: { auth0 } });
}
