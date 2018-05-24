package com.rocktionary.web.rest;


public class ComentarBandaDTO {

    private String comentario;
    private String bandaName;

    public ComentarBandaDTO () {

    }
    public ComentarBandaDTO(String comentario, String bandaName) {
        this.comentario = comentario;
        this.bandaName = bandaName;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getBandaName() {
        return bandaName;
    }

    public void setBandaName(String bandaName) {
        this.bandaName = bandaName;
    }

    @Override
    public String toString() {
        return "ComentarBandaDTO{" +
            "comentario='" + comentario + '\'' +
            ", bandaName='" + bandaName + '\'' +
            '}';
    }
}
