"use client"

import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace("/admin/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
      type="button"
    >
      Cerrar sesión
    </button>
  )
}
