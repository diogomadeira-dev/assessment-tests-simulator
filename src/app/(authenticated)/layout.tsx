import { Button } from '@/components/ui/button'
import { signOut } from '@/features/auth/actions/sign-out'
import { getAuth } from '@/features/auth/queries/get-auth'
import { redirect } from 'next/navigation'

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = await getAuth()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <>
      <form action={signOut}>
        <Button>Sign out</Button>
      </form>
      {children}
    </>
  )
}
