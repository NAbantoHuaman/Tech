package com.soporte.api.dto;

import com.soporte.api.model.Cliente;
import com.soporte.api.model.EstadoSolicitud;
import com.soporte.api.model.Tecnico;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

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

    // Getters y Setters
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public EstadoSolicitud getEstado() {
        return estado;
    }

    public void setEstado(EstadoSolicitud estado) {
        this.estado = estado;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Tecnico getTecnicoAsignado() {
        return tecnicoAsignado;
    }

    public void setTecnicoAsignado(Tecnico tecnicoAsignado) {
        this.tecnicoAsignado = tecnicoAsignado;
    }
}
