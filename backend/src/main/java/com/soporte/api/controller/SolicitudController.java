package com.soporte.api.controller;

import com.soporte.api.dto.SolicitudRequestDTO;
import com.soporte.api.dto.SolicitudResponseDTO;
import com.soporte.api.service.SolicitudService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudController {

    private final SolicitudService solicitudService;

    public SolicitudController(SolicitudService solicitudService) {
        this.solicitudService = solicitudService;
    }

    @PostMapping
    public ResponseEntity<SolicitudResponseDTO> crearSolicitud(@Valid @RequestBody SolicitudRequestDTO solicitud) {
        SolicitudResponseDTO nuevaSolicitud = solicitudService.crear(solicitud);
        return new ResponseEntity<>(nuevaSolicitud, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SolicitudResponseDTO>> listarSolicitudes() {
        List<SolicitudResponseDTO> solicitudes = solicitudService.listarTodas();
        return ResponseEntity.ok(solicitudes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitudResponseDTO> buscarPorId(@PathVariable Long id) {
        SolicitudResponseDTO solicitud = solicitudService.buscarPorId(id);
        return ResponseEntity.ok(solicitud);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SolicitudResponseDTO> actualizarSolicitud(@PathVariable Long id,
            @Valid @RequestBody SolicitudRequestDTO solicitud) {
        SolicitudResponseDTO actualizada = solicitudService.actualizar(id, solicitud);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSolicitud(@PathVariable Long id) {
        solicitudService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}