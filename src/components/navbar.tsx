/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CowzfwdSDEY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet, SheetClose } from "@/components/ui/sheet"
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800">
      <Link className="flex items-center gap-2" href="/">
        <LogoIcon />
      </Link>
      <div className="hidden md:flex gap-4">
        <Link className="text-lg font-medium hover:underline underline-offset-4" href="/regions">
          Выбор региона
        </Link>
        <Link className="text-lg font-medium hover:underline underline-offset-4" href="/">
          Выход
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid w-[200px] p-4">
            <SheetClose asChild>
              <Link
                className="text-lg font-medium hover:underline underline-offset-4"
                href="/regions"
              >
                Выбор региона
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="text-lg font-medium hover:underline underline-offset-4" href="/login">
                Выход
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function LogoIcon(props) {
  return (
      <Image {...props} src="/logo.svg" width="50" height="50" alt="Logo" />
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
