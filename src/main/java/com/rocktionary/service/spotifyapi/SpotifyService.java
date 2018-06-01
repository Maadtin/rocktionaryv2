package com.rocktionary.service.spotifyapi;

import com.rocktionary.domain.spotifyschemas.Artists;
import com.rocktionary.domain.spotifyschemas.Item;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.QueryMap;

import java.util.List;
import java.util.Map;

public interface SpotifyService {
    @GET("/v1/search")
    Call<Artists> getArtists (
        @Header("Authorization") String authorization,
        @QueryMap Map<String, String> parameters
    );
}
