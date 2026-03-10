import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Notification({ msg, error }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md text-sm font-medium
        ${error
          ? 'bg-red-500/10 border-red-500/20 text-red-400'
          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
        }`}>
        {error
          ? <AlertCircle className="w-5 h-5 shrink-0" />
          : <CheckCircle className="w-5 h-5 shrink-0" />
        }
        <span>{msg}</span>
      </div>
    </motion.div>
  );
}
