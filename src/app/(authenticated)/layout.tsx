import { redirect } from 'next/navigation';
import { getAuth } from '@/features/auth/queries/get-auth';
import { signOut } from '@/features/auth/actions/sign-out';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuth();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      <form action={signOut}>
        <button>Sign out</button>
      </form>
      {children}
    </>
  )
}
