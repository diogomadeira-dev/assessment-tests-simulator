import { cn } from '@/lib/utils'
import { AssessmentTestsStoreProvider } from '@/providers/assessment-tests-store-provider'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Assessment tests simulator',
  description: 'Assessment tests simulator',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <NextIntlClientProvider messages={messages}>
          {/* ! TODO: CHANGE TO GENERIC PROVIDER */}
          <AssessmentTestsStoreProvider>
            {children}
          </AssessmentTestsStoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
