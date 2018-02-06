package com.rocktionary.repository;

import com.rocktionary.domain.ComentarCancion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ComentarCancion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComentarCancionRepository extends JpaRepository<ComentarCancion, Long> {

    @Query("select comentar_cancion from ComentarCancion comentar_cancion where comentar_cancion.user.login = ?#{principal.username}")
    List<ComentarCancion> findByUserIsCurrentUser();

}
