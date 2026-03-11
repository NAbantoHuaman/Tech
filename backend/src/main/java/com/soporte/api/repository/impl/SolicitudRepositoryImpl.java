package com.soporte.api.repository.impl;

import com.soporte.api.model.Solicitud;
import com.soporte.api.repository.SolicitudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class SolicitudRepositoryImpl implements SolicitudRepository {

    private final Map<Long, Solicitud> repositorio = new ConcurrentHashMap<>();
    private final AtomicLong generadorIds = new AtomicLong(1);

    @Override
    public Solicitud save(Solicitud solicitud) {
        if (solicitud.getId() == null) {
            solicitud.setId(generadorIds.getAndIncrement());

            if (solicitud.getCliente() != null && solicitud.getCliente().getId() == null) {
                solicitud.getCliente().setId(generadorIds.getAndIncrement());
            }
        }

        if (solicitud.getTecnicoAsignado() != null && solicitud.getTecnicoAsignado().getId() == null) {
            solicitud.getTecnicoAsignado().setId(generadorIds.getAndIncrement());
        }
        repositorio.put(solicitud.getId(), solicitud);
        return solicitud;
    }

    @Override
    public List<Solicitud> findAll() {
        return new ArrayList<>(repositorio.values());
    }

    @Override
    public Optional<Solicitud> findById(Long id) {
        return Optional.ofNullable(repositorio.get(id));
    }

    @Override
    public void deleteById(Long id) {
        repositorio.remove(id);
    }

    @Override
    public boolean existsById(Long id) {
        return repositorio.containsKey(id);
    }
}
