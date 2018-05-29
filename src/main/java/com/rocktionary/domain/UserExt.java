package com.rocktionary.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserExt.
 */
@Entity
@Table(name = "user_ext")
public class UserExt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "foto")
    private byte[] foto;

    @Column(name = "foto_content_type")
    private String fotoContentType;

    @Column(name = "latitud")
    private Double latitud;

    @Column(name = "longitud")
    private Double longitud;

    @Column(name = "localidad")
    private String localidad;

    @Size(min = 0)
    @Column(name = "spotify_token")
    private String spotifyToken;

    @Size(min = 0)
    @Column(name = "refresh_token")
    private String refreshToken;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    public UserExt(User user, byte[] foto, String fotoContentType,  String localidad) {
        this.user = user;
        this.foto = foto;
        this.fotoContentType = fotoContentType;
        this.localidad = localidad;
    }

    public UserExt () {}

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFoto() {
        return foto;
    }

    public UserExt foto(byte[] foto) {
        this.foto = foto;
        return this;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public String getFotoContentType() {
        return fotoContentType;
    }

    public UserExt fotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
        return this;
    }

    public void setFotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
    }

    public Double getLatitud() {
        return latitud;
    }

    public UserExt latitud(Double latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public UserExt longitud(Double longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getLocalidad() {
        return localidad;
    }

    public UserExt localidad(String localidad) {
        this.localidad = localidad;
        return this;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getSpotifyToken() {
        return spotifyToken;
    }

    public UserExt spotifyToken(String spotifyToken) {
        this.spotifyToken = spotifyToken;
        return this;
    }

    public void setSpotifyToken(String spotifyToken) {
        this.spotifyToken = spotifyToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public UserExt refreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public User getUser() {
        return user;
    }

    public UserExt user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserExt userExt = (UserExt) o;
        if (userExt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExt{" +
            "id=" + getId() +
            ", foto='" + getFoto() + "'" +
            ", fotoContentType='" + getFotoContentType() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", localidad='" + getLocalidad() + "'" +
            ", spotifyToken='" + getSpotifyToken() + "'" +
            ", refreshToken='" + getRefreshToken() + "'" +
            "}";
    }
}
