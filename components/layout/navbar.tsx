import Link from "next/link";
import React from "react";
import UserButton from "../auth/user-btn";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <nav className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-lg md:text-lg">
            Career<span className="text-blue-600">Bridge</span>
          </Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/interests">interests</Link>
        </nav>
        <UserButton />
      </div>
    </header>
  );
}
