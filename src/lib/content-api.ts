import { api } from './api';

export const contentApi = {
  getFaqs: () => api.get('/faqs'),
  getBlogs: () => api.get('/blogs'),
  getBlog: (id: string) => api.get(`/blogs/${id}`),
  getOffers: () => api.get('/offers'),
  getOffer: (id: string) => api.get(`/offers/${id}`),
};
