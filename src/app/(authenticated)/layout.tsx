import { SiteHeader } from '@/components/site-header'
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
      <SiteHeader />
      <div className="bg-red-500">{children}</div>
    </>
  )
}
