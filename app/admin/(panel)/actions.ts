"use server"

import { revalidatePath } from "next/cache"

export async function refreshPublicContent() {
  const paths = ["/", "/integrantes", "/festival", "/obras", "/galerias", "/noticias", "/radio"]
  paths.forEach((path) => revalidatePath(path))
  revalidatePath("/obras/[id]", "page")
  revalidatePath("/galerias/[id]", "page")
  revalidatePath("/noticias/[id]", "page")
}
