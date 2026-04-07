export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Dashboard</h2>
      <p className="text-gray-600 mb-6">Gestiona contenidos públicos del sitio desde un único lugar.</p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Inicio: hero, misión/visión, obras destacadas y obra actual.</li>
        <li>Integrantes, Festival, Obras, Galerías, Noticias y Radio.</li>
        <li>Botón de sincronización para refrescar caché de páginas públicas.</li>
      </ul>
    </div>
  )
}
