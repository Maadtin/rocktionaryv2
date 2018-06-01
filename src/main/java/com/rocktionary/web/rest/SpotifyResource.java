package com.rocktionary.web.rest;

import com.rocktionary.domain.UserExt;
import com.rocktionary.domain.spotifyschemas.SearchItem;
import com.rocktionary.repository.UserExtRepository;
import com.rocktionary.security.SecurityUtils;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.enums.ModelObjectType;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.special.SearchResult;
import com.wrapper.spotify.model_objects.specification.*;
import com.wrapper.spotify.requests.data.artists.GetArtistRequest;
import com.wrapper.spotify.requests.data.search.SearchItemRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchAlbumsRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchArtistsRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchTracksRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")

public class SpotifyResource {


    @Autowired
    UserExtRepository userExtRepository;

    public SpotifyResource (UserExtRepository userExtRepository) {
        this.userExtRepository = userExtRepository;
    }

    private SpotifyApi spotifyApi;


    private String getToken () {
        UserExt userExt = this.userExtRepository.findByLogin(SecurityUtils.getCurrentUserLogin().get());
        return userExt.getSpotifyToken();
    }

    @GetMapping("/spotify-search-bandas/{query}")
    public List<Artist> searchArtistas (@PathVariable String query) {

        List<Artist> artistList = null;

        spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(this.getToken())
            .build();

        SearchArtistsRequest searchItemRequest = spotifyApi.searchArtists(query).build();

        try {

            Future<Paging<Artist>> searchArtists = searchItemRequest.executeAsync();
            artistList = Arrays.stream(searchArtists.get().getItems())
                .filter(artist ->
                    Arrays.stream(artist.getGenres())
                        .anyMatch(genre -> genre.contains("rock") ||
                            genre.toLowerCase().contains("metal") ||
                            genre.toLowerCase().contains("punk") ||
                            genre.toLowerCase().contains("grunge")))
                .collect(Collectors.toList());

        } catch (ExecutionException | InterruptedException e) {
           System.out.println("Error -> " + e.getMessage());
        }

        return artistList;

    }

    @GetMapping("/spotify-search-albumes/{query}")
    public List<AlbumSimplified> searchAlbumes (@PathVariable String query) {

        List<AlbumSimplified> albumSimplifiedList = null;

            spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(this.getToken())
            .build();

        SearchAlbumsRequest searchAlbumsRequest = spotifyApi.searchAlbums(query).build();

        try {

            Paging<AlbumSimplified> albums = searchAlbumsRequest.execute();

            albumSimplifiedList = Arrays.stream(albums.getItems())
                .filter(albumSimplified -> Arrays.stream(albumSimplified.getArtists())
                    .anyMatch(this::artistIsRock))
                    .collect(Collectors.toList());


        } catch (SpotifyWebApiException | IOException e) {
            System.out.println("Error -> " + e.getMessage());
        }

        return albumSimplifiedList;


    }

    @GetMapping("/spotify-search-canciones/{query}")
    public List<Track> searchCanciones (@PathVariable String query) {

        List<Track> trackList  = null;

        spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(this.getToken())
            .build();

        SearchTracksRequest searchTracksRequest = spotifyApi.searchTracks(query).build();

        try {

            Future<Paging<Track>> searchCanciones = searchTracksRequest.executeAsync();
            trackList = Arrays.stream(searchCanciones.get().getItems())
                .filter(track  -> Arrays.stream(track.getArtists())
                    .anyMatch(this::artistIsRock))
                    .collect(Collectors.toList());

        } catch (ExecutionException | InterruptedException e) {
            System.out.println("Error -> " + e.getMessage());
        }

        return trackList;

    }

    private boolean artistIsRock(ArtistSimplified artistSimplified) {
        Artist artist;
        try {
            artist = spotifyApi.getArtist(artistSimplified.getId()).build().execute();
            return Arrays.stream(artist.getGenres()).
                anyMatch(genre -> genre.toLowerCase().contains("rock") ||
                    genre.toLowerCase().contains("metal") ||
                    genre.toLowerCase().contains("punk") ||
                    genre.toLowerCase().contains("grunge")
                );
        } catch (IOException | SpotifyWebApiException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }


}
