package com.soporte.api.model;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Solicitud {

    private Long id;

    private String descripcion;

    private EstadoSolicitud estado;

    private LocalDateTime fechaCreacion;

    private Cliente cliente;

    private Tecnico tecnicoAsignado;

}