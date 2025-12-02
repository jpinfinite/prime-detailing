'use client'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Mostrar apenas 5 páginas por vez
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);
    
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition"
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="text-text-muted">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            currentPage === page
              ? 'bg-prime-yellow text-prime-black'
              : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
          }`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-text-muted">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Próxima página"
      >
        Próxima →
      </button>
    </div>
  );
}
