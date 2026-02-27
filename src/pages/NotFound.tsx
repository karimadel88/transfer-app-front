import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { ArrowLeftRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="text-8xl font-black text-brand-gold/20 mb-4">404</div>
          <h1 className="text-2xl font-black text-brand-dark mb-2">الصفحة غير موجودة</h1>
          <p className="text-gray-500 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-teal text-white font-bold px-6 py-3 rounded-xl transition-all">
              <Home className="h-4 w-4" />
              الرئيسية
            </Link>
            <Link to="/transfer" className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold px-6 py-3 rounded-xl transition-all">
              <ArrowLeftRight className="h-4 w-4" />
              تحويل الأموال
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
