const API_URL = '/api/solicitudes';

export async function listarSolicitudes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al cargar solicitudes');
  return res.json();
}

export async function crearSolicitud(solicitud) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solicitud),
  });
  if (!res.ok) throw new Error('Error al crear solicitud');
  return res.json();
}

export async function actualizarSolicitud(id, solicitud) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solicitud),
  });
  if (!res.ok) throw new Error('Error al actualizar solicitud');
  return res.json();
}

export async function eliminarSolicitud(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar solicitud');
}
