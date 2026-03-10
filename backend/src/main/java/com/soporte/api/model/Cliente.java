package com.soporte.api.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class Cliente {
    
    private Long id;
    
    @NotBlank(message = "El nombre del cliente es obligatorio")
    private String nombre;
    
    @NotBlank(message = "El email del cliente es obligatorio")
    @Email(message = "El formato del email no es válido")
    private String email;


    public Cliente() {}

    public Cliente(Long id, String nombre, String email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }

 
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}