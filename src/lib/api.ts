import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customerApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

customerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('customerAccessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const transferAuthApi = {
  register: (data: any) => api.post('/transfer/auth/register', data),
  login: (data: any) => api.post('/transfer/auth/login', data),
  getProfile: () => customerApi.get('/transfer/auth/profile'),
};

export const transferApi = {
  getMethods: () => api.get('/transfer/methods'),
  getQuote: (data: { fromMethodId: string; toMethodId: string; amount: number }) =>
    customerApi.post('/transfer/quote', data),
  confirm: (data: {
    fromMethodId: string;
    toMethodId: string;
    amount: number;
    customerName: string;
    customerPhone: string;
    customerWhatsapp: string;
  }) => customerApi.post('/transfer/confirm', data),
  getOrders: (params?: { page?: number; limit?: number; status?: string }) =>
    customerApi.get('/transfer/orders', { params }),
  getOrder: (id: string) =>
    customerApi.get(`/transfer/orders/${id}`),
};

export default api;
