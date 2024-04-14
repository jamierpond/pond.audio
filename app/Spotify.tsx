import SpotifyWebApi from 'spotify-web-api-node';


// credentials are optional
export const spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://pond.audio/spotify-redirect',
});
