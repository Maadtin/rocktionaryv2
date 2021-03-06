package com.rocktionary.repository;

import com.rocktionary.domain.ComentarBanda;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ComentarBanda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComentarBandaRepository extends JpaRepository<ComentarBanda, Long> {

    @Query("select comentar_banda from ComentarBanda comentar_banda where comentar_banda.user.login = ?#{principal.username}")
    ComentarBanda findByUserIsCurrentUser();

    List<ComentarBanda> findByBandaName(String bandaName);

}
