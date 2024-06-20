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
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 overflow-y-auto p-5">{children}</main>
      <footer className="p-2 text-right">v1.0.0</footer>
    </div>
  )
}
