import { PlusIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function Navbar({ vista, onNueva, onVolver }) {
  return (
    <nav className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl border-white/5 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-lg leading-tight">TechSupport</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-semibold">Service Console</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {vista === 'lista' ? (
            <button
              onClick={onNueva}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-95"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Nuevo Ticket</span>
            </button>
          ) : (
            <button
              onClick={onVolver}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border border-white/10"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span>Volver</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
