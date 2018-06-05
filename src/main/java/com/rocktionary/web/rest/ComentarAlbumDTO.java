package com.rocktionary.web.rest;

public class ComentarAlbumDTO {

    private String comentario;
    private String albumName;
    private String albumId;

    public ComentarAlbumDTO () {}

    public ComentarAlbumDTO(String comentario, String albumName) {
        this.comentario = comentario;
        this.albumName = albumName;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getAlbumId() {
        return albumId;
    }

    public void setAlbumId(String albumId) {
        this.albumId = albumId;
    }
}
