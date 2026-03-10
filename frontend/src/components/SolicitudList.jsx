import { 
  ClockIcon, 
  UserIcon, 
  LifebuoyIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  ArrowPathIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function SolicitudList({ solicitudes, cargando, onEdit, onDelete }) {
  if (cargando && solicitudes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-indigo-400/50">
        <ArrowPathIcon className="w-12 h-12 animate-spin mb-4" />
        <p className="font-medium">Sincronizando con el servidor...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Consola de Tickets</h2>
          <p className="text-zinc-500 mt-1">Gestiona las solicitudes de soporte en tiempo real</p>
        </div>
        
        <div className="relative group max-w-md w-full">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por cliente o descripción..."
            className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {solicitudes.map((s, idx) => (
          <TicketCard key={s.id} ticket={s} idx={idx} onEdit={onEdit} onDelete={onDelete} />
        ))}
        
        {solicitudes.length === 0 && !cargando && (
          <div className="col-span-full glass-card rounded-3xl p-12 text-center border-dashed border-white/10">
            <LifebuoyIcon className="w-16 h-16 mx-auto text-zinc-700 mb-4" />
            <h3 className="text-xl font-semibold text-white">Sin tickets activos</h3>
            <p className="text-zinc-500 mt-2">No hay solicitudes pendientes que requieran atención.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TicketCard({ ticket, idx, onEdit, onDelete }) {
  const statusColors = {
    PENDIENTE: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-500' },
    EN_PROCESO: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', dot: 'bg-cyan-500' },
    RESUELTO: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-500' }
  };

  const style = statusColors[ticket.estado] || statusColors.PENDIENTE;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-3xl p-6 flex flex-col h-full group transition-all duration-300 hover:border-indigo-500/30 shadow-2xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${style.bg} ${style.text} ${style.border} border`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
          {ticket.estado?.replace('_', ' ')}
        </div>
        <div className="text-[11px] font-mono text-zinc-600 bg-white/5 px-2 py-1 rounded text-right">
          #{ticket.id?.toString().padStart(4, '0')}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 leading-tight group-hover:text-indigo-300 transition-colors">
        {ticket.descripcion}
      </h3>

      <div className="mt-auto space-y-4">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10 shrink-0">
            <UserIcon className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">{ticket.cliente?.nombre}</p>
            <p className="text-zinc-500 text-[11px] truncate">{ticket.cliente?.email}</p>
          </div>
        </div>

        {ticket.tecnicoAsignado && (
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-indigo-500/20">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10 shrink-0">
              <WrenchScrewdriverIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Técnico Asignado</span>
                <span className="text-[10px] text-zinc-600 bg-white/5 px-1.5 py-0.5 rounded font-mono">#{ticket.tecnicoAsignado.id}</span>
              </div>
              <p className="text-white text-sm font-semibold truncate">{ticket.tecnicoAsignado.nombre}</p>
              <p className="text-zinc-500 text-[11px] truncate">{ticket.tecnicoAsignado.especialidad}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <ClockIcon className="w-4 h-4" />
            <span className="text-[11px] font-medium">{ticket.fechaCreacion?.split(' ')[0]}</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(ticket)}
              className="p-2.5 rounded-xl bg-white/5 text-zinc-400 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all border border-white/5"
              title="Editar Ticket"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onDelete(ticket.id)}
              className="p-2.5 rounded-xl bg-white/5 text-zinc-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all border border-white/5"
              title="Eliminar Ticket"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
