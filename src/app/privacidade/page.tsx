import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade - Detailing Prime",
  description: "Política de privacidade do Detailing Prime. Como coletamos, usamos e protegemos seus dados.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-prime-black min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Política de <span className="text-prime-yellow">Privacidade</span>
          </h1>
          <p className="text-text-secondary mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className="prose prose-invert max-w-none">
            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">1. Informações que Coletamos</h2>
              <p className="text-text-secondary mb-4">
                O Detailing Prime coleta informações limitadas para melhorar sua experiência:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Dados de navegação (páginas visitadas, tempo de permanência)</li>
                <li>Informações técnicas (navegador, sistema operacional, dispositivo)</li>
                <li>Email (apenas se você assinar nossa newsletter voluntariamente)</li>
              </ul>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">2. Como Usamos suas Informações</h2>
              <p className="text-text-secondary mb-4">
                Utilizamos os dados coletados para:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Melhorar o conteúdo e a experiência do site</li>
                <li>Enviar newsletters (apenas se você se inscreveu)</li>
                <li>Analisar o tráfego e comportamento dos usuários (Google Analytics)</li>
                <li>Garantir a segurança e funcionamento do site</li>
              </ul>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">3. Cookies</h2>
              <p className="text-text-secondary mb-4">
                Utilizamos cookies para:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Análise de tráfego (Google Analytics)</li>
                <li>Melhorar a experiência de navegação</li>
                <li>Lembrar suas preferências</li>
              </ul>
              <p className="text-text-secondary mt-4">
                Você pode desabilitar cookies nas configurações do seu navegador.
              </p>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">4. Compartilhamento de Dados</h2>
              <p className="text-text-secondary">
                <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros</strong> para fins comerciais.
                Dados podem ser compartilhados apenas com:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mt-4">
                <li>Google Analytics (dados anônimos de navegação)</li>
                <li>Serviços de hospedagem (Cloudflare Pages)</li>
              </ul>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">5. Seus Direitos (LGPD)</h2>
              <p className="text-text-secondary mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar consentimento (cancelar newsletter)</li>
              </ul>
              <p className="text-text-secondary mt-4">
                Para exercer seus direitos, entre em contato: <a href="mailto:contato@detailingprime.com.br" className="text-prime-yellow hover:underline">contato@detailingprime.com.br</a>
              </p>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">6. Segurança</h2>
              <p className="text-text-secondary">
                Implementamos medidas de segurança para proteger seus dados, incluindo:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mt-4">
                <li>Conexão HTTPS (SSL/TLS)</li>
                <li>Hospedagem segura (Cloudflare)</li>
                <li>Acesso restrito a dados pessoais</li>
              </ul>
            </div>

            <div className="bg-prime-gray-medium p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">7. Contato</h2>
              <p className="text-text-secondary">
                Dúvidas sobre nossa política de privacidade?
              </p>
              <p className="text-text-secondary mt-4">
                Email: <a href="mailto:contato@detailingprime.com.br" className="text-prime-yellow hover:underline">contato@detailingprime.com.br</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
