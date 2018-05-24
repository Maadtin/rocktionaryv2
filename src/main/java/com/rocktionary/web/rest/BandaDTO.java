package com.rocktionary.web.rest;

class  BandaDTO {

    private Integer rating;
    private String bandaName;

    public BandaDTO () {}
    public BandaDTO(Integer rating, String bandaName) {
        this.rating = rating;
        this.bandaName = bandaName;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getBandaName() {
        return bandaName;
    }

    public void setBandaName(String bandaName) {
        this.bandaName = bandaName;
    }

    @Override
    public String toString() {
        return "BandaDTO{" +
            "rating='" + rating + '\'' +
            ", bandaName='" + bandaName + '\'' +
            '}';
    }
}
