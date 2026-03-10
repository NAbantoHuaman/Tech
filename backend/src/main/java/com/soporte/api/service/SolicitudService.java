package com.soporte.api.service;

import com.soporte.api.dto.SolicitudRequestDTO;
import com.soporte.api.dto.SolicitudResponseDTO;
import java.util.List;

public interface SolicitudService {
    SolicitudResponseDTO crear(SolicitudRequestDTO solicitudDTO);

    List<SolicitudResponseDTO> listarTodas();

    SolicitudResponseDTO buscarPorId(Long id);

    SolicitudResponseDTO actualizar(Long id, SolicitudRequestDTO solicitudActualizada);

    void eliminar(Long id);
}
