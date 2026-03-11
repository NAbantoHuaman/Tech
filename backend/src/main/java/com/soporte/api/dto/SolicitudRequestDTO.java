package com.soporte.api.dto;

import com.soporte.api.model.Cliente;
import com.soporte.api.model.EstadoSolicitud;
import com.soporte.api.model.Tecnico;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SolicitudRequestDTO {

    @NotBlank(message = "La descripción de la solicitud es obligatoria")
    @Size(min = 10, max = 500, message = "La descripción debe tener entre 10 y 500 caracteres")
    private String descripcion;

    @NotNull(message = "El estado es obligatorio (PENDIENTE, EN_PROCESO, RESUELTO)")
    private EstadoSolicitud estado;

    @NotNull(message = "Los datos del cliente son obligatorios")
    @Valid
    private Cliente cliente;

    private Tecnico tecnicoAsignado;

}
