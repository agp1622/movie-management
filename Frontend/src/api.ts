import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || 'your-secret-api-key-here';

const apiWithAuth = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_TOKEN,
  },
});

const apiPublic = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Movies
  getMovies: () => apiPublic.get('/movies').then(res => res.data),
  getMovie: (id: number) => apiPublic.get(`/movies/${id}`).then(res => res.data),
  createMovie: (data: any) => apiWithAuth.post('/movies', data).then(res => res.data),
  updateMovie: (id: number, data: any) => apiWithAuth.patch(`/movies/${id}`, data).then(res => res.data),
  deleteMovie: (id: number) => apiWithAuth.delete(`/movies/${id}`),

  // Actors
  getActors: () => apiPublic.get('/actors').then(res => res.data),
  getActor: (id: number) => apiPublic.get(`/actors/${id}`).then(res => res.data),
  createActor: (data: any) => apiWithAuth.post('/actors', data).then(res => res.data),
  updateActor: (id: number, data: any) => apiWithAuth.patch(`/actors/${id}`, data).then(res => res.data),
  deleteActor: (id: number) => apiWithAuth.delete(`/actors/${id}`),

  // Ratings
  getRatings: (movieId: number) => apiPublic.get(`/ratings/movie/${movieId}`).then(res => res.data),
  createRating: (data: any) => apiWithAuth.post('/ratings', data).then(res => res.data),
  updateRating: (id: number, data: any) => apiWithAuth.patch(`/ratings/${id}`, data).then(res => res.data),
  deleteRating: (id: number) => apiWithAuth.delete(`/ratings/${id}`),

  // Movie-Actor
  addActorToMovie: (movieId: number, actorId: number, characterName?: string) =>
    apiWithAuth.post(`/movies/${movieId}/actors/${actorId}`, { character_name: characterName }).then(res => res.data),
  removeActorFromMovie: (movieId: number, actorId: number) =>
    apiWithAuth.delete(`/movies/${movieId}/actors/${actorId}`),
};