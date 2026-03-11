package com.soporte.api.controller;

import com.soporte.api.dto.SolicitudRequestDTO;
import com.soporte.api.dto.SolicitudResponseDTO;
import com.soporte.api.service.SolicitudService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
@RequiredArgsConstructor
public class SolicitudController {

    private final SolicitudService solicitudService;

    @Operation(summary = "Crear nueva solicitud de soporte", description = "Registra una nueva solicitud con sus detalles, cliente y técnico opcional")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Solicitud creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de solicitud inválidos")
    })
    @PostMapping
    public ResponseEntity<SolicitudResponseDTO> crearSolicitud(@Valid @RequestBody SolicitudRequestDTO solicitud) {
        SolicitudResponseDTO nuevaSolicitud = solicitudService.crear(solicitud);
        return new ResponseEntity<>(nuevaSolicitud, HttpStatus.CREATED);
    }

    @Operation(summary = "Listar todas las solicitudes", description = "Obtiene una lista de todas las solicitudes de soporte registradas")
    @ApiResponse(responseCode = "200", description = "Lista de solicitudes obtenida exitosamente")
    @GetMapping
    public ResponseEntity<List<SolicitudResponseDTO>> listarSolicitudes() {
        List<SolicitudResponseDTO> solicitudes = solicitudService.listarTodas();
        return ResponseEntity.ok(solicitudes);
    }

    @Operation(summary = "Buscar solicitud por ID", description = "Obtiene los detalles de una solicitud específica mediante su identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitud encontrada"),
            @ApiResponse(responseCode = "404", description = "Solicitud no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudResponseDTO> buscarPorId(
            @Parameter(description = "ID de la solicitud", required = true) @PathVariable Long id) {
        SolicitudResponseDTO solicitud = solicitudService.buscarPorId(id);
        return ResponseEntity.ok(solicitud);
    }

    @Operation(summary = "Actualizar solicitud", description = "Actualiza los datos de una solicitud existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitud actualizada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos"),
            @ApiResponse(responseCode = "404", description = "Solicitud no encontrada")
    })
    @PutMapping("/{id}")
    public ResponseEntity<SolicitudResponseDTO> actualizarSolicitud(
            @Parameter(description = "ID de la solicitud a actualizar", required = true) @PathVariable Long id,
            @Valid @RequestBody SolicitudRequestDTO solicitud) {
        SolicitudResponseDTO actualizada = solicitudService.actualizar(id, solicitud);
        return ResponseEntity.ok(actualizada);
    }

    @Operation(summary = "Eliminar solicitud", description = "Elimina permanentemente una solicitud del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Solicitud eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Solicitud no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSolicitud(
            @Parameter(description = "ID de la solicitud a eliminar", required = true) @PathVariable Long id) {
        solicitudService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}