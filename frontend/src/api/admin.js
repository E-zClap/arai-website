import { api, setToken, clearToken, getToken } from './client';

export const isAuthenticated = () => !!getToken();
export const logout = () => clearToken();

export const login = (username, password) =>
  api.post('/auth/login', { username, password }).then((r) => {
    setToken(r.data.access_token);
    return r.data;
  });

export const me = () => api.get('/auth/me').then((r) => r.data);

export const changePassword = (current_password, new_password) =>
  api.post('/auth/change-password', { current_password, new_password }).then((r) => r.data);

// ---- News ----
export const adminListNews = () => api.get('/news').then((r) => r.data);
export const createNews = (data) => api.post('/news', data).then((r) => r.data);
export const updateNews = (id, data) => api.put(`/news/${id}`, data).then((r) => r.data);
export const deleteNews = (id) => api.delete(`/news/${id}`).then((r) => r.data);

// ---- Publications ----
export const adminListPublications = () => api.get('/publications').then((r) => r.data);
export const syncPublications = () => api.post('/publications/sync').then((r) => r.data);
export const createPublication = (data) => api.post('/publications', data).then((r) => r.data);
export const updatePublication = (id, data) => api.put(`/publications/${id}`, data).then((r) => r.data);
export const deletePublication = (id) => api.delete(`/publications/${id}`).then((r) => r.data);

// ---- Team ----
export const uploadTeamImage = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api
    .post('/team/upload-image', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);
};
export const adminListTeam = () => api.get('/team/all').then((r) => r.data);
export const createMember = (data) => api.post('/team', data).then((r) => r.data);
export const updateMember = (id, data) => api.put(`/team/${id}`, data).then((r) => r.data);
export const deleteMember = (id) => api.delete(`/team/${id}`).then((r) => r.data);
