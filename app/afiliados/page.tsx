import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso de Afiliados',
  description: 'Transparência sobre nossos links de afiliados e como isso funciona na UNIKA STORE.',
}

export default function AfiliadosPage() {
  return (
    <div className="container-site py-12 max-w-3xl">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Aviso de Afiliados</h1>
      <p className="text-gray-500 text-sm mb-8">Última atualização: junho de 2026</p>

      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-black text-gray-900 mb-2">O que são links de afiliados?</h2>
          <p>
            A UNIKA STORE participa de programas de afiliados de plataformas como Shopee, Amazon Brasil,
            Mercado Livre, Magazine Luiza e AliExpress. Isso significa que, quando você clica em um link
            neste site e realiza uma compra, podemos receber uma comissão da plataforma — sem nenhum
            custo adicional para você.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-gray-900 mb-2">Isso afeta nossas recomendações?</h2>
          <p>
            <strong>Não.</strong> Nossa missão é recomendar produtos que realmente valem a pena.
            A comissão que recebemos não influencia nossas avaliações. Se um produto tem pontos
            negativos, nós dizemos — mesmo que seja um dos nossos mais clicados.
          </p>
          <p className="mt-3">
            A seção "Vale a Pena?" é nossa ferramenta de transparência: mostramos prós, pontos
            de atenção e uma nota honesta antes de qualquer recomendação.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-gray-900 mb-2">Preços e disponibilidade</h2>
          <p>
            Os preços exibidos são atualizados regularmente mas podem variar a qualquer momento
            nas plataformas parceiras. Sempre verifique o preço final antes de finalizar a compra.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-gray-900 mb-2">Programas dos quais participamos</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Programa de Afiliados Shopee (shopee.com.br)</li>
            <li>Amazon Associados Brasil (amazon.com.br)</li>
            <li>Programa de Afiliados Mercado Livre</li>
            <li>Programa de Parceiros Magazine Luiza</li>
            <li>Portal de Afiliados AliExpress</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-gray-900 mb-2">Contato</h2>
          <p>
            Dúvidas sobre nossos links ou parcerias? Entre em contato pelo e-mail:{' '}
            <a href="mailto:contato@unikaloja.com.br" className="text-indigo-600 hover:underline">
              contato@unikaloja.com.br
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
