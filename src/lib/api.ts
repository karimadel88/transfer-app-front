import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transferApi = {
  getMethods: () => api.get('/transfer/methods'),
  getQuote: (data: { fromMethodId: string; toMethodId: string; amount: number }) =>
    api.post('/transfer/quote', data),
  confirm: (data: {
    fromMethodId: string;
    toMethodId: string;
    amount: number;
    customerName?: string;
    customerPhone?: string;
    customerWhatsapp?: string;
  }) => api.post('/transfer/confirm', data),
  getOrders: (params: { phone: string; page?: number; limit?: number; status?: string }) =>
    api.get('/transfer/orders', { params }),
  getOrder: (id: string, phone: string) =>
    api.get(`/transfer/orders/${id}`, { params: { phone } }),
};

export default api;
