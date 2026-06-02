'use client';

import { createContext, useContext, useState, useCallback, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { getIcon } from '@/lib/icon-utils';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'achievement' | 'success' | 'info' | 'error';
  icon?: string;
}

interface ToastContextType {
  toast: (t: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  };

  const typeStyles: Record<string, string> = {
    achievement: 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20',
    success: 'bg-emerald-500/10 border-emerald-500/20',
    info: 'bg-accent/10 border-accent/20',
    error: 'bg-red-500/10 border-red-500/20',
  };

  const typeIcons: Record<string, React.ReactNode> = {
    achievement: <Trophy className="w-5 h-5 text-amber-400" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    info: <Zap className="w-5 h-5 text-accent-light" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-20 lg:bottom-4 right-4 z-[90] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`pointer-events-auto w-80 rounded-xl border p-4 backdrop-blur-xl ${typeStyles[t.type]} bg-deep-1/90 shadow-lg shadow-black/20`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {t.icon
                    ? createElement(getIcon(t.icon), { className: 'w-5 h-5 text-accent-light' })
                    : typeIcons[t.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-soft-white">{t.title}</p>
                  {t.description && <p className="text-base text-muted mt-0.5">{t.description}</p>}
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="p-0.5 rounded text-muted hover:text-soft-white transition-colors flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress bar */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 4, ease: 'linear' }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent/20 rounded-full origin-left"
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
