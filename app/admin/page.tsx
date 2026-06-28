'use client'
import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import type { Product } from '@/types'

type Tab = 'dashboard' | 'produtos' | 'categorias' | 'blog' | 'newsletter' | 'banners'

const BADGE_OPTIONS = [
  { key: 'badge_semana', label: '⭐ Achado da Semana' },
  { key: 'badge_viral', label: '🔥 Viral' },
  { key: 'badge_mais_vendido', label: '🏆 Mais Vendido' },
  { key: 'badge_oferta', label: '⚡ Oferta Relâmpago' },
  { key: 'badge_recomendado', label: '✅ Recomendado' },
]

function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-2xl font-black text-gray-900">{value}</div>
      <div className="text-sm font-semibold text-gray-600 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}

function ProductRow({ product, onEdit }: { product: Product; onEdit: (p: Product) => void }) {
  const price = product.mainLink.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{product.images[0]}</span>
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="text-xs text-gray-400">{product.category}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1">
          {product.badges.map(b => (
            <span key={b} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
              {b.replace('-', ' ')}
            </span>
          ))}
        </div>
      </td>
      <td className="py-3 px-4 text-sm font-bold">{price}</td>
      <td className="py-3 px-4 text-sm text-gray-500">⭐ {product.rating}</td>
      <td className="py-3 px-4">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${product.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {product.active ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td className="py-3 px-4">
        <button onClick={() => onEdit(product)} className="text-xs text-indigo-600 font-semibold hover:text-indigo-800">
          Editar →
        </button>
      </td>
    </tr>
  )
}

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  if (!product) return null
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h2 className="font-black text-lg">Editar Produto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome</label>
            <input defaultValue={product.name} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Descrição curta</label>
            <input defaultValue={product.shortDescription} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preço atual</label>
              <input defaultValue={product.mainLink.price} type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preço original</label>
              <input defaultValue={product.mainLink.originalPrice} type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Link de afiliado (principal)</label>
            <input defaultValue={product.mainLink.url} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Selos / Badges</label>
            <div className="space-y-2">
              {BADGE_OPTIONS.map(b => (
                <label key={b.key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={product.badges.includes(b.key.replace('badge_', '').replace('_', '-') as any)} className="w-4 h-4 accent-indigo-600" />
                  <span className="text-sm">{b.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
              Salvar alterações
            </button>
            <button onClick={onClose} className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl text-sm transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [search, setSearch] = useState('')

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'produtos', label: 'Produtos', icon: '📦' },
    { key: 'categorias', label: 'Categorias', icon: '🗂' },
    { key: 'blog', label: 'Blog', icon: '✍️' },
    { key: 'newsletter', label: 'Newsletter', icon: '📧' },
    { key: 'banners', label: 'Banners', icon: '🖼' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0A0A0F] flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-white font-black">UNIKA</span>
          </div>
          <p className="text-white/30 text-xs mt-0.5">Painel Administrativo</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 transition-colors ${
                tab === t.key ? 'bg-indigo-600 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <a href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">← Ver site</a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-black mb-6">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon="📦" label="Produtos ativos" value={String(PRODUCTS.filter(p => p.active).length)} sub="+3 esta semana" />
                <StatCard icon="🖱️" label="Cliques hoje" value="1.240" sub="↑ 18% vs ontem" />
                <StatCard icon="💰" label="Comissões estimadas" value="R$842" sub="Este mês" />
                <StatCard icon="📧" label="Assinantes" value="1.847" sub="+34 essa semana" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h2 className="font-black mb-4">🔥 Produtos mais clicados (7d)</h2>
                  <div className="space-y-3">
                    {PRODUCTS.slice(0, 5).map((p, i) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <span className="text-sm font-black text-gray-300 w-5">{i + 1}</span>
                        <span className="text-xl">{p.images[0]}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{p.name}</p>
                        </div>
                        <span className="text-sm font-bold text-gray-500">{Math.floor(Math.random() * 400 + 100)} cliques</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h2 className="font-black mb-4">📋 Ações rápidas</h2>
                  <div className="space-y-2">
                    {[
                      { label: 'Adicionar produto', icon: '➕', href: '#' },
                      { label: 'Criar post no blog', icon: '✍️', href: '#' },
                      { label: 'Gerenciar banners', icon: '🖼', href: '#' },
                      { label: 'Exportar newsletter', icon: '📧', href: '#' },
                    ].map(a => (
                      <button key={a.label} className="w-full flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-colors text-sm font-semibold text-gray-700">
                        <span>{a.icon}</span>{a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Produtos */}
          {tab === 'produtos' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black">Produtos</h1>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">
                  ➕ Adicionar produto
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50">
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar produto por nome ou categoria..."
                    className="w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Produto</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Selos</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Preço</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Rating</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(p => <ProductRow key={p.id} product={p} onEdit={setEditingProduct} />)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {['categorias', 'blog', 'newsletter', 'banners'].includes(tab) && (
            <div>
              <h1 className="text-2xl font-black mb-2 capitalize">{tab}</h1>
              <p className="text-gray-400 text-sm">Módulo em desenvolvimento. Conecte ao Supabase para CRUD completo.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {editingProduct && <ProductModal product={editingProduct} onClose={() => setEditingProduct(null)} />}
    </div>
  )
}
