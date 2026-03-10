import { useState, useEffect } from 'react';
import { 
  PaperAirplaneIcon, 
  XMarkIcon, 
  IdentificationIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ESTADOS = [
  { val: 'PENDIENTE', label: 'Pendiente', help: 'Ticket recién recibido.' },
  { val: 'EN_PROCESO', label: 'En Proceso', help: 'Técnico asignado.' },
  { val: 'RESUELTO', label: 'Resuelto', help: 'Incidencia finalizada.' }
];

const TECNICOS = [
  { nombre: 'Ana Systems', especialidad: 'Hardware' },
  { nombre: 'Carlos Dev', especialidad: 'Software' },
  { nombre: 'Maria Redes', especialidad: 'Redes y Telecomunicaciones' },
  { nombre: 'Jose Cloud', especialidad: 'Servidores y Cloud' },
  { nombre: 'Laura Sec', especialidad: 'Ciberseguridad' }
];

export default function SolicitudForm({ editando, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    descripcion: '',
    estado: 'PENDIENTE',
    cliente: { nombre: '', email: '' },
    tecnicoAsignado: { nombre: '', especialidad: '' }
  });

  useEffect(() => {
    if (editando) setFormData(editando);
  }, [editando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {editando ? 'Actualizar Expediente' : 'Abrir Nuevo Ticket'}
          </h2>
          <p className="text-zinc-500 mt-1">Completa los campos para registrar la solicitud técnica</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="glass-card rounded-3xl p-8 space-y-6 border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <IdentificationIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Información del Cliente</h3>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Nombre Completo</label>
              <div className="relative group">
                <IdentificationIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 border-r border-white/5 pr-3 box-content group-focus-within:text-indigo-400 transition-colors" />
                <input
                  required
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-14 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-medium"
                  value={formData.cliente.nombre}
                  onChange={e => setFormData({ ...formData, cliente: { ...formData.cliente, nombre: e.target.value } })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Correo Electrónico</label>
              <div className="relative group">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 border-r border-white/5 pr-3 box-content group-focus-within:text-indigo-400 transition-colors" />
                <input
                  required
                  type="email"
                  placeholder="juan@empresa.com"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-14 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-medium"
                  value={formData.cliente.email}
                  onChange={e => setFormData({ ...formData, cliente: { ...formData.cliente, email: e.target.value } })}
                />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 space-y-6 border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <CommandLineIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Estado de la Solicitud</h3>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Seleccionar Estado</label>
              <div className="grid grid-cols-1 gap-3">
                {ESTADOS.map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setFormData({ ...formData, estado: opt.val })}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                      formData.estado === opt.val 
                        ? 'border-indigo-500/50 bg-indigo-500/10 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-500/10' 
                        : 'border-white/5 bg-black/20 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      formData.estado === opt.val ? 'border-indigo-500' : 'border-zinc-700'
                    }`}>
                      {formData.estado === opt.val && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${formData.estado === opt.val ? 'text-white' : 'text-zinc-400'}`}>
                        {opt.label}
                      </div>
                      <div className="text-[10px] text-zinc-600 mt-0.5">{opt.help}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Técnico Asignado */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-8 space-y-6 border-white/5 mt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <WrenchScrewdriverIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Técnico Asignado</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Seleccionar Especialista</label>
                <div className="relative group">
                  <IdentificationIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 border-r border-white/5 pr-3 box-content group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                  <select
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-14 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-medium appearance-none cursor-pointer"
                    value={formData.tecnicoAsignado?.nombre || ''}
                    onChange={e => {
                      const selected = TECNICOS.find(t => t.nombre === e.target.value);
                      if (selected) {
                        setFormData({ 
                          ...formData, 
                          tecnicoAsignado: { nombre: selected.nombre, especialidad: selected.especialidad },
                          estado: formData.estado === 'PENDIENTE' ? 'EN_PROCESO' : formData.estado
                        });
                      } else {
                        // Limpiar selection
                        const { tecnicoAsignado, ...rest } = formData;
                        setFormData(rest);
                      }
                    }}
                  >
                    <option value="" className="bg-zinc-900">-- Sin Técnico Asignado --</option>
                    {TECNICOS.map(t => (
                      <option key={t.nombre} value={t.nombre} className="bg-zinc-900">
                        {t.nombre} - Especialidad en {t.especialidad}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 glass-card rounded-3xl p-8 border-white/5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Descripción Técnica</h3>
                </div>
              </div>
              
              <textarea
                required
                minLength={10}
                rows={4}
                placeholder="Describe el fallo detalladamente..."
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all resize-none font-medium"
                value={formData.descripcion}
                onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3.5 rounded-2xl text-zinc-500 font-bold hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            Descartar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 text-sm"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            {editando ? 'Guardar Cambios' : 'Abrir Ticket'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
