import Link from "next/link"
import { Button } from "@/components/ui/button"
// import { signOut } from "@/app/auth"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

// async function handleSignOut() {
// //   "use server"
// //   await signOut()
// }

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-bold text-xl">
          RoasTodo
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
			<Link href="/about">
				<Button variant="ghost">About</Button>
			</Link>
			<Link href="/todos">
				<Button variant="ghost">My Todos</Button>
			</Link>
          <form >
            <Button variant="ghost">Logout</Button>
          </form>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="/about">
                  <Button variant="ghost" className="w-full justify-start">
                    About
                  </Button>
                </Link>
                <Link href="/todos">
                  <Button variant="ghost" className="w-full justify-start">
                    My Todos
                  </Button>
                </Link>
                <form >
                  <Button variant="ghost" className="w-full justify-start">
                    Logout
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
} 