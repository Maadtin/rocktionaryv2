package com.rocktionary.web.rest;

public class SpotifyTokenDTO {

    private String accesToken;
    private String query;
    private String type;


    public SpotifyTokenDTO() {}

    public SpotifyTokenDTO(String accesToken, String query, String type) {
        this.accesToken = accesToken;
        this.query = query;
        this.type = type;
    }

    public String getAccesToken() {
        return accesToken;
    }

    public void setAccesToken(String accesToken) {
        this.accesToken = accesToken;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
