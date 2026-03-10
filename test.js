const http = require('http');

const data = JSON.stringify({
  descripcion: "Mi computadora no enciende despues de una actualización y la pantalla parpadea constantemente.",
  estado: "PENDIENTE",
  cliente: {
    nombre: "Juan Perez",
    email: "juan.perez@example.com"
  }
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/solicitudes',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let chunks = [];
  res.on('data', (d) => chunks.push(d));
  res.on('end', () => {
    const responseBody = Buffer.concat(chunks).toString();
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`BODY: ${responseBody}`);
    
    // Si fue exitoso, ejecutar el PUT para asignar al técnico
    if(res.statusCode === 201) {
      const savedId = JSON.parse(responseBody).id;
      
      const putData = JSON.stringify({
        descripcion: "Mi computadora no enciende despues de una actualización y la pantalla parpadea constantemente.",
        estado: "EN_PROCESO",
        cliente: {
          id: JSON.parse(responseBody).cliente.id,
          nombre: "Juan Perez",
          email: "juan.perez@example.com"
        },
        tecnicoAsignado: {
          nombre: "Ana Systems",
          especialidad: "Hardware"
        }
      });
      
      const putOptions = {
        hostname: 'localhost',
        port: 8080,
        path: `/api/solicitudes/${savedId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(putData)
        }
      };
      
      const putReq = http.request(putOptions, (putRes) => {
        let putChunks = [];
        putRes.on('data', (d) => putChunks.push(d));
        putRes.on('end', () => {
          console.log(`PUT STATUS: ${putRes.statusCode}`);
          console.log(`PUT BODY: ${Buffer.concat(putChunks).toString()}`);
        });
      });
      putReq.write(putData);
      putReq.end();
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
