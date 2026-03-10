import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { listarSolicitudes, crearSolicitud, actualizarSolicitud, eliminarSolicitud } from './api';
import SolicitudList from './components/SolicitudList';
import SolicitudForm from './components/SolicitudForm';
import Notification from './components/Notification';
import Navbar from './components/Navbar';

export default function App() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [vista, setVista] = useState('lista');
  const [cargando, setCargando] = useState(false);
  const [editando, setEditando] = useState(null);
  const [notif, setNotif] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const data = await listarSolicitudes();
      setSolicitudes(data);
    } catch {
      mostrarNotif('Error: Conexión perdida con el núcleo del sistema.', true);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  const mostrarNotif = (msg, error = false) => {
    setNotif({ msg, error });
    setTimeout(() => setNotif(null), 5000);
  };

  const handleNueva = () => { setEditando(null); setVista('formulario'); };
  const handleEditar = (s) => { setEditando(s); setVista('formulario'); };
  const handleVolver = () => { setEditando(null); setVista('lista'); };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Confirmar purga permanente de este registro?')) return;
    try {
      await eliminarSolicitud(id);
      mostrarNotif('Registro eliminado permanentemente del sistema.');
      cargar();
    } catch {
      mostrarNotif('Operación fallida. Verifique sus permisos de red.', true);
    }
  };

  const handleGuardar = async (data) => {
    setCargando(true);
    try {
      if (editando) {
        await actualizarSolicitud(editando.id, data);
        mostrarNotif('Sincronización completa: Expediente actualizado.');
      } else {
        await crearSolicitud(data);
        mostrarNotif('Protocolo exitoso: Ticket registrado en el núcleo.');
      }
      cargar();
      handleVolver();
    } catch {
      mostrarNotif('Fallo crítico al intentar escribir en la base de datos.', true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] anima-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>

      <Navbar vista={vista} onNueva={handleNueva} onVolver={handleVolver} />

      <main className="max-w-7xl mx-auto px-6 py-6 relative">
        <AnimatePresence>
          {notif && <Notification msg={notif.msg} error={notif.error} key="notif" />}
        </AnimatePresence>

        <div className="mt-4">
          <AnimatePresence mode="wait">
            {vista === 'lista' ? (
              <SolicitudList
                key="list"
                solicitudes={solicitudes}
                cargando={cargando}
                onEdit={handleEditar}
                onDelete={handleEliminar}
              />
            ) : (
              <SolicitudForm
                key="form"
                editando={editando}
                onSave={handleGuardar}
                onCancel={handleVolver}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

