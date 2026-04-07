"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inicio", label: "Inicio" },
  { href: "/admin/integrantes", label: "Integrantes" },
  { href: "/admin/festival", label: "Festival de Teatro" },
  { href: "/admin/obras", label: "Obras" },
  { href: "/admin/galleries", label: "Galerías" },
  { href: "/admin/noticias", label: "Noticias" },
  { href: "/admin/radio", label: "Radio" },
  { href: "/admin/sections", label: "Secciones técnicas" },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {links.map((link) => {
        const active = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
