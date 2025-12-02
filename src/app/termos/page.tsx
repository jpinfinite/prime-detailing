import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso - Detailing Prime",
  description: "Termos de uso do Detailing Prime. Regras e condições para uso do site.",
};

export default function TermsPage() {
  return (
    <div className="bg-prime-black min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Termos de <span className="text-prime-yellow">Uso</span>
          </h1>
          <p className="text-text-secondary mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className="prose prose-invert max-w-none">
            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">1. Aceitação dos Termos</h2>
              <p className="text-text-secondary">
                Ao acessar e usar o Detailing Prime, você concorda com estes Termos de Uso. 
                Se você não concorda com algum termo, por favor, não utilize o site.
              </p>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">2. Uso do Conteúdo</h2>
              <p className="text-text-secondary mb-4">
                O conteúdo do Detailing Prime é fornecido para fins educacionais e informativos.
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Você pode ler, compartilhar e referenciar nosso conteúdo</li>
                <li>É proibida a cópia integral de artigos sem autorização</li>
                <li>Citações devem incluir link para a fonte original</li>
                <li>Uso comercial requer autorização prévia</li>
              </ul>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">3. Propriedade Intelectual</h2>
              <p className="text-text-secondary mb-4">
                Todo o conteúdo do site (textos, imagens, logos, design) é propriedade do Detailing Prime ou de seus parceiros.
              </p>
              <p className="text-text-secondary">
                Marcas e produtos mencionados pertencem aos seus respectivos proprietários.
              </p>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">4. Isenção de Responsabilidade</h2>
              <p className="text-text-secondary mb-4">
                O conteúdo é fornecido "como está" para fins informativos:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Não nos responsabilizamos por danos causados pelo uso das técnicas descritas</li>
                <li>Recomendamos sempre consultar profissionais qualificados</li>
                <li>Reviews refletem nossa opinião e experiência pessoal</li>
                <li>Não garantimos resultados específicos</li>
              </ul>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">5. Links Externos</h2>
              <p className="text-text-secondary">
                O site pode conter links para sites externos. Não nos responsabilizamos pelo conteúdo, 
                políticas de privacidade ou práticas de sites de terceiros.
              </p>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">6. Comentários e Interações</h2>
              <p className="text-text-secondary mb-4">
                Ao interagir com o site (comentários, emails, redes sociais):
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Seja respeitoso e educado</li>
                <li>Não publique conteúdo ofensivo, ilegal ou spam</li>
                <li>Reservamos o direito de moderar e remover conteúdo inadequado</li>
              </ul>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">7. Modificações</h2>
              <p className="text-text-secondary">
                Reservamos o direito de modificar estes termos a qualquer momento. 
                Alterações entram em vigor imediatamente após publicação no site.
              </p>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">8. Contato</h2>
              <p className="text-text-secondary">
                Dúvidas sobre os Termos de Uso?
              </p>
              <p className="text-text-secondary mt-4">
                Email: <a href="mailto:detailingprime@proton.me" className="text-prime-yellow hover:underline">detailingprime@proton.me</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
