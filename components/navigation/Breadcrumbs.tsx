"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show on home/dashboard
  if (pathname === "/" || pathname === "/dashboard" || pathname === "/business/dashboard") {
    return null;
  }

  const paths = pathname.split("/").filter(Boolean);
  
  return (
    <div className="container mx-auto px-8 py-4">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
          
          return (
            <div key={href} className="flex items-center gap-2">
              <span className="text-gray-400">/</span>
              {isLast ? (
                <span className="font-semibold text-gray-900">{label}</span>
              ) : (
                <Link href={href} className="text-gray-600 hover:text-blue-600">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}