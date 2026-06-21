import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl sm:text-9xl font-heading font-black bg-gradient-to-r from-cyan-400 to-gold-400 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
          Chunk Not Found
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Looks like you've wandered into uncharted territory. This page doesn't exist or has been moved to a different dimension.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button icon={<Home className="w-4 h-4" />}>
              Return to Spawn
            </Button>
          </Link>
          <Link to="/support">
            <Button variant="secondary" icon={<Search className="w-4 h-4" />}>
              Get Help
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
