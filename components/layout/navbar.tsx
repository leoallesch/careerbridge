import Link from "next/link";
import UserButton from "../auth/user-btn";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <nav className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-3xl md:text-3xl">
            career<span className="text-primary">bridge</span>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
