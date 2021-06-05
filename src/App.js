import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import Player from "./components/Player";
import { getTokenFromResponse } from "./Spotify";
import "./App.css";
import Login from "./components/Login";

const spotify = new SpotifyWebApi();

function App() {
  //Update: Data Layer
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    //Access token when logged in
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      //Give Spoitfy the access token to share information to and fro
      spotify.setAccessToken(_token);
      //Dispatch the token to the data layer
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      //Get access to the User details
      spotify.getPlaylist("37i9dQZEVXcGx7K9sOs4wb").then((response) =>
        //Dispatch the user details to the data layer
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
      // {!token && <Login />}
      // {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
