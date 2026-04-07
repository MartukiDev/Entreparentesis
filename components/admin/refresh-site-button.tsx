"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { refreshPublicContent } from "@/app/admin/(panel)/actions"

export default function RefreshSiteButton() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      className="w-full rounded-md bg-green-600 text-white py-2 text-sm font-medium hover:bg-green-700 disabled:opacity-60"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await refreshPublicContent()
          router.refresh()
        })
      }}
    >
      {pending ? "Sincronizando..." : "Sincronizar cambios en la vista"}
    </button>
  )
}
