import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import AdminNav from "@/components/admin/admin-nav"
import LogoutButton from "@/components/admin/logout-button"
import RefreshSiteButton from "@/components/admin/refresh-site-button"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()

  if (profile?.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        <aside className="bg-white rounded-lg border p-4 h-fit">
          <h1 className="text-lg font-bold mb-4">Panel administrativo</h1>
          <AdminNav />
          <div className="mt-6 pt-4 border-t">
            <RefreshSiteButton />
          </div>
          <div className="mt-4 pt-4 border-t">
            <LogoutButton />
          </div>
        </aside>
        <main className="bg-white rounded-lg border p-6">{children}</main>
      </div>
    </div>
  )
}
