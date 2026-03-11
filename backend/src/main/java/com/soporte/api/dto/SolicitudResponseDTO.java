package com.soporte.api.dto;

import com.soporte.api.model.Cliente;
import com.soporte.api.model.EstadoSolicitud;
import com.soporte.api.model.Tecnico;
import lombok.Data;

@Data
public class SolicitudResponseDTO {

    private Long id;
    private String descripcion;
    private EstadoSolicitud estado;
    private String fechaCreacion; 
    private Cliente cliente;
    private Tecnico tecnicoAsignado;

}
