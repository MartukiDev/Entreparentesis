import Link from "next/link"

export default function RadioPlayer() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Radio Entreparéntesis</h2>
      <p className="text-gray-600 mb-6 text-center">Escucha nuestra programación cultural y artística en vivo</p>

      <div className="aspect-video w-full mb-6">
        <iframe
          src="https://sp.totalstreaming.net/cp/widgets/player/single/?p=8044"
          className="w-full h-full border-0 rounded-md"
          title="Radio Arte Entreparéntesis - Reproductor"
          allow="autoplay"
          loading="lazy"
        ></iframe>
      </div>

      <div className="text-center">
        <Link
          href="/radio"
          className="inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 transition-colors duration-300"
        >
          Explorar nuestra radio
        </Link>
      </div>
    </div>
  )
}
