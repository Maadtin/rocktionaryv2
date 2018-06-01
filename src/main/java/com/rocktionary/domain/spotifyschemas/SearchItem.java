package com.rocktionary.domain.spotifyschemas;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.enums.ModelObjectType;
import com.wrapper.spotify.requests.data.search.SearchItemRequest;

public class SearchItem {

    private static final SpotifyApi SPOTIFY_API = new SpotifyApi.Builder()
        .build();

    private static final SearchItemRequest SEARCH_ITEM_REQUEST = SPOTIFY_API.searchItem("BTS", ModelObjectType.ARTIST.getType())
        .build();



}
