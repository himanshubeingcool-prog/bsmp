import { Users, Construction } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-7 h-7 text-cyan-400" />
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">Teams</h1>
            <p className="text-sm text-gray-400 mt-0.5">Create and manage your in-game teams</p>
          </div>
        </div>

        <div className="glass-card rounded-xl border border-border p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-stone-800/50 flex items-center justify-center">
            <Construction className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-300 mb-2">Teams Coming Soon</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            Team management will be available once the Minecraft plugin is connected.
            Create squads, track stats, and compete together!
          </p>
          <Button variant="primary" onClick={() => window.open('https://discord.gg/s7CETJXYhf', '_blank')}>
            Join Discord for Updates
          </Button>
        </div>
      </div>
    </div>
  );
}
