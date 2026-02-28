import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';

export function CustomerProtectedRoute({ children }: { children: ReactNode }) {
  const { customer, loading } = useCustomerAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
