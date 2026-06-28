import { api } from './client';

// Public content endpoints. These return data in the exact shape the
// public pages expect (bilingual EN/JP objects, etc.).
export const fetchNews = () => api.get('/news').then((r) => r.data);
export const fetchPublications = () => api.get('/publications').then((r) => r.data);
export const fetchTeam = () => api.get('/team').then((r) => r.data);
