"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface NavLink {
  href: string;
  label?: string;
}

export interface PageNavProps {
  back?: NavLink;
  forward?: NavLink;
}

export function PageNav({ back, forward }: PageNavProps) {
  return (
    <nav className="btn-primary text-white flex justify-between items-center w-full p-8">
      <div>
        {back && (
          <Link href={back.href}>
            <Button className="gap-2 font-bold">{"<  " + back.label}</Button>
          </Link>
        )}
      </div>
      <div>
        {forward && (
          <Link href={forward.href}>
            <Button className="gap-2 font-bold">{forward.label + " >"}</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
