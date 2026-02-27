import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

function Header() {
  return (
    <header className="bg-brand-dark border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center">
            <span className="text-brand-gold font-bold">$</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm leading-tight">الفتح</span>
            <span className="text-brand-gold text-[10px] leading-tight">لخدمات الدفع الالكتروني</span>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/transfer" className="text-white/60 hover:text-brand-gold transition-colors text-sm">تحويل</Link>
          <Link to="/orders" className="text-white/60 hover:text-brand-gold transition-colors text-sm">طلباتي</Link>
        </nav>
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
            href="https://wa.me/201006409853"
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
      href="https://wa.me/201006409853"
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
