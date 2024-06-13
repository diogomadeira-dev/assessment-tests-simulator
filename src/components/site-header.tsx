import Link from 'next/link'

// import { siteConfig } from "@/config/site"
// import { CommandMenu } from '@/components/command-menu'
import { signOut } from '@/features/auth/actions/sign-out'
import { cn } from '@/lib/utils'
import { CircleEllipsis } from 'lucide-react'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { Button, buttonVariants } from './ui/button'

// import { Icons } from "@/components/icons"
// import { MainNav } from "@/components/main-nav"
// import { MobileNav } from "@/components/mobile-nav"
// import { ModeToggle } from "@/components/mode-toggle"
// import { buttonVariants } from "@/registry/new-york/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex items-center">
            <Link href="/" target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}
              >
                <CircleEllipsis className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link href="/" target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}
              >
                <CircleEllipsis className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            {/* <ModeToggle /> */}
            <form action={signOut}>
              <Button>Sign out</Button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  )
}
