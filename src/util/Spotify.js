const client_id = 'ee167b114e8e41d7b138fed6f6a30aef';
const redirect_uri = "http://localhost:3000/";

let accessToken;


const Spotify = {
    getAccessToken() {
    if(accessToken){
      return accessToken;
    }
    const tokenValue = window.location.href.match(/access_token=([^&]*)/);
    const tokenExpiration = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenValue && tokenExpiration) {
      accessToken = tokenValue[1];
      let expiresIn = Number(tokenExpiration[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
  headers: {Authorization: `Bearer ${accessToken}`}
  }).then(response => {
  return response.json();
}).then(jsonResponse => {
  if (jsonResponse.tracks) {
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  } else {
    return [];
  }
});
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: 'Bearer '+{accessToken}};
    let userID;
    let playlistID;

    fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json()).then(jsonResponse => {
      userID = jsonResponse.id;
    }).then(()=>{
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
        headers: headers,
        method: 'POST',
        body: JSON.stringify({playlistName: playlistName})
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        playlistID = jsonResponse.id;
      })
    }).then(()=>{
      fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
        headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
      })
    })
  },

}


export default Spotify;
