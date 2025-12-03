import { getAllAuthors, getAuthorStats } from '@/data/authors';
import AuthorCard from '@/components/AuthorCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nossos Autores Especialistas',
  description: 'Conheça os especialistas que criam conteúdo de qualidade sobre estética automotiva no Detailing Prime.',
};

export default function AuthorsPage() {
  const authors = getAllAuthors();
  const stats = getAuthorStats();

  return (
    <div className="min-h-screen bg-prime-black py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-prime-yellow/10 border border-prime-yellow/30 rounded-full px-6 py-2 mb-6">
            <span className="text-prime-yellow font-semibold">👥 Equipe de Especialistas</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Nossos <span className="text-prime-yellow">Autores</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Conheça os profissionais que compartilham conhecimento e experiência em estética automotiva
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-prime-yellow">{stats.totalAuthors}</p>
              <p className="text-text-muted text-sm">Especialistas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-prime-yellow">{stats.totalArticles}+</p>
              <p className="text-text-muted text-sm">Artigos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-prime-yellow">{stats.avgExperience}+</p>
              <p className="text-text-muted text-sm">Anos Média</p>
            </div>
          </div>
        </div>

        {/* Grid de Autores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-prime-gray-medium rounded-lg border border-prime-gray-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Quer fazer parte da equipe?
          </h2>
          <p className="text-text-secondary mb-6">
            Estamos sempre em busca de especialistas para compartilhar conhecimento
          </p>
          <a
            href="/contato"
            className="inline-block px-8 py-3 bg-prime-yellow hover:bg-prime-yellow-light text-prime-black font-bold rounded-lg transition-all transform hover:scale-105"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </div>
  );
}
