export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string; 
  running_time: string; 
  rt_score: string;     
  image?: string;       
  movie_banner?: string;
};
export type Song = {
  id: string;
  thumbnail: string;
  artist: string;
  score: string;
  playlist: string;
  title: string;

};

export async function getFilms(): Promise<Film[]> {
  const res = await fetch(`https://ghibliapi.vercel.app/films`);
  if (!res.ok) throw new Error('Failed to fetch films');
  return res.json();
}

export async function getFilmById(id: string): Promise<Film> {
  const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
  if (!res.ok) throw new Error('Failed to fetch film');
  return res.json();
}

export async function getSongs(): Promise<[Song]> {
  const res = await fetch(`https://api.allorigins.win/raw?url=https://openwhyd.org/hot/electro?format=json`);
  if (!res.ok) throw new Error('Failed to fetch films');
  return res.json();
}



// src/api/data.tsx
export const fetchMusic = async () => {
  try {
    const res = await fetch('https://api.allorigins.win/raw?url=https://openwhyd.org/hot/electro?format=json');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching music:', error);
    return [];
  }
};