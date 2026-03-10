package com.soporte.api.repository;

import com.soporte.api.model.Solicitud;
import java.util.List;
import java.util.Optional;

public interface SolicitudRepository {
    Solicitud save(Solicitud solicitud);

    List<Solicitud> findAll();

    Optional<Solicitud> findById(Long id);

    void deleteById(Long id);

    boolean existsById(Long id);
}
