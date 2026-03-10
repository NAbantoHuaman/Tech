package com.soporte.api.service.impl;

import com.soporte.api.dto.SolicitudRequestDTO;
import com.soporte.api.dto.SolicitudResponseDTO;
import com.soporte.api.exception.RecursoNoEncontradoException;
import com.soporte.api.model.Solicitud;
import com.soporte.api.repository.SolicitudRepository;
import com.soporte.api.service.SolicitudService;
import com.soporte.api.util.SolicitudMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitudServiceImpl implements SolicitudService {

    private final SolicitudRepository repositorio;

    public SolicitudServiceImpl(SolicitudRepository repositorio) {
        this.repositorio = repositorio;
    }

    @Override
    public SolicitudResponseDTO crear(SolicitudRequestDTO solicitudDTO) {
        Solicitud solicitud = SolicitudMapper.toEntity(solicitudDTO);
        solicitud.setFechaCreacion(LocalDateTime.now());

        Solicitud guardada = repositorio.save(solicitud);
        return SolicitudMapper.toDTO(guardada);
    }

    @Override
    public List<SolicitudResponseDTO> listarTodas() {
        return repositorio.findAll().stream()
                .map(SolicitudMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SolicitudResponseDTO buscarPorId(Long id) {
        Solicitud solicitud = repositorio.findById(id)
                .orElseThrow(
                        () -> new RecursoNoEncontradoException("No se encontró la solicitud de soporte con ID: " + id));
        return SolicitudMapper.toDTO(solicitud);
    }

    @Override
    public SolicitudResponseDTO actualizar(Long id, SolicitudRequestDTO solicitudActualizada) {
        Solicitud existente = repositorio.findById(id)
                .orElseThrow(
                        () -> new RecursoNoEncontradoException("No se encontró la solicitud de soporte con ID: " + id));

        existente.setDescripcion(solicitudActualizada.getDescripcion());
        existente.setEstado(solicitudActualizada.getEstado());

        if (solicitudActualizada.getCliente() != null) {
            if (solicitudActualizada.getCliente().getId() == null && existente.getCliente() != null) {
                solicitudActualizada.getCliente().setId(existente.getCliente().getId());
            }
            existente.setCliente(solicitudActualizada.getCliente());
        }

        if (solicitudActualizada.getTecnicoAsignado() != null) {
            // Si la base de datos ya tenía un técnico con un ID con anterioridad,
            // conservarlo
            if (existente.getTecnicoAsignado() != null && existente.getTecnicoAsignado().getId() != null) {
                solicitudActualizada.getTecnicoAsignado().setId(existente.getTecnicoAsignado().getId());
            }
            // Asigna el nuevo técnico modificado (con o sin ID)
            // Si el ID es nulo, el Repository se encargará de crearle uno automáticamente
            existente.setTecnicoAsignado(solicitudActualizada.getTecnicoAsignado());
        }

        Solicitud actualizada = repositorio.save(existente);
        return SolicitudMapper.toDTO(actualizada);
    }

    @Override
    public void eliminar(Long id) {
        if (!repositorio.existsById(id)) {
            throw new RecursoNoEncontradoException("No se encontró la solicitud de soporte con ID: " + id);
        }
        repositorio.deleteById(id);
    }
}
