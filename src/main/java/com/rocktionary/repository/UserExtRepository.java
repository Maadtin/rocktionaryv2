package com.rocktionary.repository;

import com.rocktionary.domain.UserExt;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserExt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtRepository extends JpaRepository<UserExt, Long> {


    UserExt findByUserId(Long id);


    @Query("select u.user, u.foto, u.localidad from UserExt u where u.user.login = ?1")
    UserExt findUserExtByName (String userName);

}
