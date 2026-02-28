import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CustomerAuthProvider } from './contexts/CustomerAuthContext';

const Landing = lazy(() => import('./pages/Landing'));
const Transfer = lazy(() => import('./pages/Transfer'));
const Orders = lazy(() => import('./pages/Orders'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CustomerLogin = lazy(() => import('./pages/auth/CustomerLogin'));
const CustomerRegister = lazy(() => import('./pages/auth/CustomerRegister'));
const FAQPage = lazy(() => import('./pages/FAQ'));
const BlogsPage = lazy(() => import('./pages/Blogs'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const OffersPage = lazy(() => import('./pages/Offers'));
const OfferDetails = lazy(() => import('./pages/OfferDetails'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-brand-dark/60 font-cairo">جاري التحميل...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CustomerAuthProvider>
      <BrowserRouter>
        <Toaster 
          position="top-center" 
          richColors 
          dir="rtl"
          toastOptions={{
            className: 'font-cairo',
            style: {
              marginTop: '75px', // Avoid overlapping the fixed header
              padding: '16px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 'bold',
            }
          }}
        />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/auth/login" element={<CustomerLogin />} />
            <Route path="/auth/register" element={<CustomerRegister />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/offers/:id" element={<OfferDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CustomerAuthProvider>
  );
}
