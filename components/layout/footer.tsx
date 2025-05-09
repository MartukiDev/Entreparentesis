import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="https://www.instagram.com/artentreparentesis/" className="hover:text-gray-400">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-10 w-10" />
          </Link>
          <Link href="https://www.facebook.com/FestivaldeTeatrodeBuin" className="hover:text-gray-400">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-10 w-10" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-6 text-sm">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <Link href="/contacto" className="hover:text-gray-400">
                contacto@artentreparentesis.cl
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} All rights reserved Compañía de Teatro Entreparéntesis
          </p>
        </div>
      </div>
    </footer>
  )
}

