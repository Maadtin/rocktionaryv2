
package com.rocktionary.domain.spotifyschemas;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Example {

    @SerializedName("artists")
    @Expose
    private Artists artists;

    public Artists getArtists() {
        return artists;
    }

    public void setArtists(Artists artists) {
        this.artists = artists;
    }

    @Override
    public String toString() {
        return "Example{" +
            "artists=" + artists +
            '}';
    }
}
