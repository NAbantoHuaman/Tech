package com.soporte.api.util;

import com.soporte.api.dto.SolicitudRequestDTO;
import com.soporte.api.dto.SolicitudResponseDTO;
import com.soporte.api.model.Solicitud;

import java.time.format.DateTimeFormatter;

public class SolicitudMapper {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static Solicitud toEntity(SolicitudRequestDTO dto) {
        if (dto == null)
            return null;

        Solicitud solicitud = new Solicitud();
        solicitud.setDescripcion(dto.getDescripcion());
        solicitud.setEstado(dto.getEstado());
        solicitud.setCliente(dto.getCliente());
        solicitud.setTecnicoAsignado(dto.getTecnicoAsignado());

        return solicitud;
    }

    public static SolicitudResponseDTO toDTO(Solicitud solicitud) {
        if (solicitud == null)
            return null;

        SolicitudResponseDTO dto = new SolicitudResponseDTO();
        dto.setId(solicitud.getId());
        dto.setDescripcion(solicitud.getDescripcion());
        dto.setEstado(solicitud.getEstado());
        dto.setCliente(solicitud.getCliente());
        dto.setTecnicoAsignado(solicitud.getTecnicoAsignado());

        if (solicitud.getFechaCreacion() != null) {
            dto.setFechaCreacion(solicitud.getFechaCreacion().format(FORMATTER));
        }

        return dto;
    }
}
