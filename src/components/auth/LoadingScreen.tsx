export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-gold-500 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-48 h-3 rounded-full bg-card animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
          <div className="w-32 h-2 rounded-full bg-card animate-shimmer" style={{ backgroundSize: '200% 100%', animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
}
