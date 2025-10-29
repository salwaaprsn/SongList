export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { id: string; title: string };
  SongList: undefined;
  SongDetail: { id: string }; // <--- pastikan ini ada
};


export type TabParamList = {
  Movies: undefined;
  Songs: undefined;
};
