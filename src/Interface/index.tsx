interface SpotifyPlayerType {
  access_token: string;
  currentTrack: string;
  playing: boolean;
}

interface ArtistInterface {
  artists: {
    map: Function;
  };
}

interface AlbumsInterface {
  albums: {
    map: Function;
  };
}

interface ModalType {
  triggerModal: boolean;
  setModalTrigger: Function;
  children: React.ReactNode;
}

interface ArtistList {
  id: string;
}
