import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { transferAuthApi } from '../lib/api';

export interface Customer {
  id: string;
  name: string;
  phone: string;
}

interface CustomerAuthContextType {
  customer: Customer | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('customerAccessToken');
    if (token) {
      transferAuthApi.getProfile()
        .then(res => setCustomer(res.data))
        .catch(() => {
          localStorage.removeItem('customerAccessToken');
          localStorage.removeItem('customerRefreshToken');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: any) => {
    const res = await transferAuthApi.login(data);
    localStorage.setItem('customerAccessToken', res.data.accessToken);
    localStorage.setItem('customerRefreshToken', res.data.refreshToken);
    setCustomer(res.data.customer);
  };

  const register = async (data: any) => {
    const res = await transferAuthApi.register(data);
    localStorage.setItem('customerAccessToken', res.data.accessToken);
    localStorage.setItem('customerRefreshToken', res.data.refreshToken);
    setCustomer(res.data.customer);
  };

  const logout = () => {
    localStorage.removeItem('customerAccessToken');
    localStorage.removeItem('customerRefreshToken');
    setCustomer(null);
  };

  return (
    <CustomerAuthContext.Provider value={{ customer, loading, login, register, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
};
