import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { contentApi } from '@/lib/content-api';
import { FAQ } from '@/types/content';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    contentApi.getFaqs()
      .then(res => setFaqs(res.data?.data || res.data || []))
      .catch(() => toast.error('فشل تحميل الأسئلة الشائعة'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12 max-w-3xl" dir="rtl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-brand-dark mb-3">الأسئلة الشائعة</h1>
          <p className="text-gray-500">نجيب على أهم استفساراتكم</p>
        </div>
        
        <div className="space-y-4">
          {faqs.length === 0 ? (
            <p className="text-center text-gray-500 py-10">لا توجد أسئلة شائعة حالياً</p>
          ) : (
            faqs.map(faq => (
              <div 
                key={faq._id} 
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                  className="w-full flex justify-between items-center p-5 text-right hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <h3 className="font-bold text-brand-dark pl-4 font-cairo text-lg">{faq.question}</h3>
                  {openId === faq._id ? (
                    <ChevronUp className="h-5 w-5 text-brand-gold shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openId === faq._id && (
                  <div className="p-5 border-t border-gray-50 bg-gray-50/50">
                    <p className="text-gray-600 leading-relaxed font-cairo whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  );
}
