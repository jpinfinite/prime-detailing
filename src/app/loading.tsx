export default function Loading() {
  return (
    <div className="min-h-screen bg-prime-black flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-prime-gray-light rounded-full"></div>
          <div className="absolute inset-0 border-4 border-prime-yellow rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Texto */}
        <p className="text-text-secondary text-lg">Carregando...</p>
      </div>
    </div>
  );
}
