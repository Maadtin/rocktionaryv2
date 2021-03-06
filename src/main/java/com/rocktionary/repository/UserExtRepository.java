package com.rocktionary.repository;

import com.rocktionary.domain.UserExt;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserExt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtRepository extends JpaRepository<UserExt, Long> {


    UserExt findByUserId(Long id);

    @Query("select new UserExt(u.user, u.id, u.foto, u.spotifyToken, u.fotoContentType, u.localidad) from UserExt u where u.user.login = :username")
    UserExt findByLogin(@Param("username") String userName);

}
