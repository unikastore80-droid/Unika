import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-site py-20 text-center">
      <div className="text-8xl mb-6">😕</div>
      <h1 className="text-3xl font-black text-gray-900 mb-2">Página não encontrada</h1>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        O produto ou página que você procura não existe ou foi removido.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Voltar para a home
        </Link>
        <Link
          href="/busca"
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Buscar produtos
        </Link>
      </div>
    </div>
  )
}
