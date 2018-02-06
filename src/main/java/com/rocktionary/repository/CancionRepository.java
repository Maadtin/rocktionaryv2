package com.rocktionary.repository;

import com.rocktionary.domain.Cancion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cancion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CancionRepository extends JpaRepository<Cancion, Long> {

}
