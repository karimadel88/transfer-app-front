import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, LogIn, User, Menu, X } from 'lucide-react';
import { useCustomerAuth } from '@/contexts/CustomerAuthContext';

function Header() {
  const { customer, logout } = useCustomerAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-brand-dark border-b border-white/10 relative z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 relative z-50">
          <div className="w-9 h-9 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center">
            <span className="text-brand-gold font-bold">$</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm leading-tight">الفتح</span>
            <span className="text-brand-gold text-[10px] leading-tight">لخدمات الدفع الالكتروني</span>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white p-2 relative z-50"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Navigation - Desktop & Mobile */}
        <div className={`
          absolute md:static top-16 left-0 w-full md:w-auto bg-brand-dark md:bg-transparent
          border-b border-white/10 md:border-none p-4 md:p-0
          flex flex-col md:flex-row items-center gap-4 transition-all duration-300
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'}
        `}>
          <nav className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-brand-gold transition-colors text-sm py-2 md:py-0 w-full text-center md:w-auto border-b border-white/5 md:border-none">العروض</Link>
            <Link to="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-brand-gold transition-colors text-sm py-2 md:py-0 w-full text-center md:w-auto border-b border-white/5 md:border-none">المدونة</Link>
            <Link to="/transfer" onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-brand-gold transition-colors text-sm py-2 md:py-0 w-full text-center md:w-auto border-b border-white/5 md:border-none">تحويل</Link>
            <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-brand-gold transition-colors text-sm py-2 md:py-0 w-full text-center md:w-auto border-b border-white/5 md:border-none">طلباتي</Link>
          </nav>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-center mt-2 md:mt-0">
            {customer ? (
              <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-white/80 text-sm flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {customer.name}
                </span>
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="text-white/60 hover:text-red-400 transition-colors text-sm font-bold border-r border-white/10 pr-3"
                >
                  خروج
                </button>
              </div>
            ) : (
              <Link 
                to="/auth/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2 rounded-lg transition-all text-sm border border-white/20 backdrop-blur-sm w-full md:w-auto"
              >
                <LogIn className="w-4 h-4" />
                سجل الدخول
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/10 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm">© {new Date().getFullYear()} الفتح لخدمات الدفع الالكتروني</p>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/2010 09531974"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            واتساب
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/2010 09531974"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 transition-all hover:scale-110"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
