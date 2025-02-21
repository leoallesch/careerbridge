"use client";

import Link from "next/link";

export default function Footer() {
  const footerLinks=[
    {title: "About",href: "/about"},
    {title: "Contact",href: "/contact"},
    {title: "Privacy Policy",href: "/privacy"},
    {title: "Terms of Service",href: "/terms"},
    {title: "FAQ",href: "/faq"},
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200 w-full py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Links Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-gray-700">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-900 transition-colors text-sm md:text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section (Optional - you can customize or remove) */}
          <div className="col-span-1 flex justify-start md:justify-end">
            <ul className="flex space-x-4 text-gray-700">
              <li>
                <Link
                  href="https://twitter.com"
                  className="hover:text-gray-900 transition-colors text-sm md:text-base"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com"
                  className="hover:text-gray-900 transition-colors text-sm md:text-base"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com"
                  className="hover:text-gray-900 transition-colors text-sm md:text-base"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-gray-500 text-sm md:text-base">
          © {new Date().getFullYear()} CareerBridge 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}