import Link from "next/link";
import React from "react";
import UserButton from "./user-btn";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <nav className="flex items-center space-x-4">
          <Link href="/" className="font-bold">
            careerbridge
          </Link>
          <Link href="/dashboard">dashboard</Link>
          <Link href="/interests">interests</Link>
        </nav>
        <UserButton />
      </div>
    </header>
  );
}
