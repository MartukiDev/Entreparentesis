"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"

const mainNavigation = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Integrantes", href: "/integrantes" },
  { name: "Festival de Teatro de Buin", href: "/festival" },
]

const teatroNavigation = [
  { name: "Obras de Teatro", href: "/obras" },
  { name: "Galerías", href: "/galerias" },
]

const mediaNavigation = [
  { name: "Noticias", href: "/noticias" },
  { name: "Radio", href: "/radio" },
]

const allNavigation = [
  ...mainNavigation,
  ...teatroNavigation,
  ...mediaNavigation,
  { name: "Contacto", href: "/contacto" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [teatroDropdownOpen, setTeatroDropdownOpen] = useState(false)
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false)
  const pathname = usePathname()
  const teatroRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdowns cuando se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (teatroRef.current && !teatroRef.current.contains(event.target as Node)) {
        setTeatroDropdownOpen(false)
      }
      if (mediaRef.current && !mediaRef.current.contains(event.target as Node)) {
        setMediaDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isActivePath = (href: string) => pathname === href
  const isActiveSection = (items: typeof mainNavigation) => 
    items.some(item => pathname === item.href)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Entreparéntesis</span>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900">
              Entreparéntesis
            </h1>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {/* Enlaces principales */}
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors ${
                isActivePath(item.href) 
                  ? "text-red-600 border-b-2 border-red-600" 
                  : "text-gray-900 hover:text-red-600"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Dropdown Teatro */}
          <div className="relative" ref={teatroRef}>
            <button
              type="button"
              className={`flex items-center text-sm font-semibold leading-6 transition-colors ${
                isActiveSection(teatroNavigation)
                  ? "text-red-600" 
                  : "text-gray-900 hover:text-red-600"
              }`}
              onClick={() => {
                setTeatroDropdownOpen(!teatroDropdownOpen)
                setMediaDropdownOpen(false)
              }}
            >
              Teatro
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${teatroDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {teatroDropdownOpen && (
              <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {teatroNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isActivePath(item.href)
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                    }`}
                    onClick={() => setTeatroDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Media */}
          <div className="relative" ref={mediaRef}>
            <button
              type="button"
              className={`flex items-center text-sm font-semibold leading-6 transition-colors ${
                isActiveSection(mediaNavigation)
                  ? "text-red-600" 
                  : "text-gray-900 hover:text-red-600"
              }`}
              onClick={() => {
                setMediaDropdownOpen(!mediaDropdownOpen)
                setTeatroDropdownOpen(false)
              }}
            >
              Media
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${mediaDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {mediaDropdownOpen && (
              <div className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {mediaNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isActivePath(item.href)
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                    }`}
                    onClick={() => setMediaDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contacto */}
          <Link
            href="/contacto"
            className={`text-sm font-semibold leading-6 transition-colors ${
              isActivePath("/contacto") 
                ? "text-red-600 border-b-2 border-red-600" 
                : "text-gray-900 hover:text-red-600"
            }`}
          >
            Contacto
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-25" 
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Entreparéntesis</span>
                <h2 className="text-xl font-bold text-gray-900">Entreparéntesis</h2>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-2 py-6">
                  {allNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors ${
                        isActivePath(item.href) 
                          ? "text-red-600 bg-red-50" 
                          : "text-gray-900 hover:bg-gray-50 hover:text-red-600"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
