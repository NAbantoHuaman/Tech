package com.soporte.api.model;

import jakarta.validation.constraints.NotBlank;

public class Tecnico {
    
    private Long id;
    
    @NotBlank(message = "El nombre del técnico es obligatorio")
    private String nombre;
    
    @NotBlank(message = "La especialidad del técnico es obligatoria")
    private String especialidad;

    
    public Tecnico() {}

    public Tecnico(Long id, String nombre, String especialidad) {
        this.id = id;
        this.nombre = nombre;
        this.especialidad = especialidad;
    }

 
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEspecialidad() { return especialidad; }
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }
}