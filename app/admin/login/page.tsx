"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createSupabaseBrowserClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

      if (signInError) {
        setError(signInError.message)
        return
      }

      router.replace("/admin")
      router.refresh()
    } catch {
      setError("No fue posible iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg border p-6">
        <h1 className="text-2xl font-bold mb-2">Acceso administrativo</h1>
        <p className="text-gray-600 mb-6">Ingresa con un usuario administrador de Supabase Auth.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-red-600 text-white py-2 font-medium hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  )
}
