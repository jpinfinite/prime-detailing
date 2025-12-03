import Image from 'next/image';
import Link from 'next/link';
import { Author } from '@/data/authors';

interface AuthorCardProps {
  author: Author;
  compact?: boolean;
}

export default function AuthorCard({ author, compact = false }: AuthorCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-prime-yellow">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-text-primary font-semibold text-sm">{author.name}</p>
          <p className="text-text-muted text-xs">{author.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-prime-gray-medium rounded-lg border border-prime-gray-light p-6 hover:border-prime-yellow transition-all group">
      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-prime-yellow group-hover:scale-110 transition-transform">
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Nome e Cargo */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-prime-yellow transition-colors">
          {author.name}
        </h3>
        <p className="text-prime-yellow text-sm font-semibold mb-2">
          {author.role}
        </p>
        <p className="text-text-secondary text-sm">
          {author.specialty}
        </p>
      </div>

      {/* Bio */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-3">
        {author.bio}
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-4 mb-4 pb-4 border-b border-prime-gray-light">
        <div className="text-center">
          <p className="text-prime-yellow font-bold text-lg">{author.stats.articles}</p>
          <p className="text-text-muted text-xs">Artigos</p>
        </div>
        <div className="text-center">
          <p className="text-prime-yellow font-bold text-lg">{author.stats.experience}</p>
          <p className="text-text-muted text-xs">Experiência</p>
        </div>
      </div>

      {/* Social */}
      <div className="flex justify-center gap-3">
        {author.social.instagram && (
          <a
            href={`https://instagram.com/${author.social.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-prime-yellow transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        )}
        {author.social.youtube && (
          <a
            href={`https://youtube.com/@${author.social.youtube.replace(/\s+/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-prime-yellow transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        )}
        {author.social.linkedin && (
          <a
            href={`https://linkedin.com/in/${author.social.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-prime-yellow transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
