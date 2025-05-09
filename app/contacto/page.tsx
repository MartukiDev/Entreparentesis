"use client"

import { Facebook, Instagram, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Contáctanos</h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6 leading-relaxed">
        Si tienes cualquier duda, no dudes en escribirnos.<br />
        Haz clic en el correo para enviarnos un mensaje.
      </p>
      <a
        href="mailto:contacto@entreparentesis.cl"
        className="text-red-600 text-lg md:text-xl font-medium flex items-center justify-center gap-3 mb-10"
      >
        <Mail className="h-6 w-6" />
        contacto@entreparentesis.cl
      </a>

      <div className="flex space-x-8">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition-opacity"
        >
          <Facebook className="h-11 w-11 text-gray-700" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition-opacity"
        >
          <Instagram className="h-11 w-11 text-gray-700" />
        </a>
      </div>
    </div>
  )
}
