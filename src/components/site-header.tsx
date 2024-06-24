import { signOut } from '@/features/auth/actions/sign-out'
import { LogOut } from 'lucide-react'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { Button } from './ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
            <p>teste</p>
          </div> */}
          <nav className="flex items-center">
            {/* <Link href="/" target="_blank" rel="noreferrer">
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
            </Link> */}
            {/* <ModeToggle /> */}
            <form action={signOut}>
              <Button variant="outline">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  )
}
