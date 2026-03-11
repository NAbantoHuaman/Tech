package com.soporte.api.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    private Long id;

    @NotBlank(message = "El nombre del cliente es obligatorio")
    private String nombre;

    @NotBlank(message = "El email del cliente es obligatorio")
    @Email(message = "El formato del email no es válido")
    private String email;

}