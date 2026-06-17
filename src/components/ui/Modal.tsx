import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative w-full ${sizes[size]} animate-scale-in`}
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
          {title && (
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <h2 className="text-lg font-heading font-bold">{title}</h2>
              <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          )}
          <div className={`${title ? 'p-4 sm:p-6' : 'p-4 sm:p-6'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
