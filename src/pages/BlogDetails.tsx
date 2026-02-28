import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { contentApi } from '@/lib/content-api';
import { Blog } from '@/types/content';
import { Loader2, ArrowRight, Share2, Facebook, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Helmet } from 'react-helmet-async';

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    contentApi.getBlog(id)
      .then(res => setBlog(res.data))
      .catch(() => toast.error('فشل تحميل المقالة'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
        </div>
      </PageLayout>
    );
  }

  if (!blog) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="text-gray-500">المقالة غير موجودة</p>
          <Link to="/blogs" className="text-brand-gold font-bold flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة للمدونة
          </Link>
        </div>
      </PageLayout>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageLayout>
      <Helmet>
        <title>{blog.title} | الفتح للدفع الالكتروني</title>
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description.substring(0, 160)} />
        {blog.imageId?.url && <meta property="og:image" content={blog.imageId.url} />}
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl" dir="rtl">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors mb-8 font-medium">
          <ArrowRight className="h-4 w-4" />
          العودة للمدونة
        </Link>
        
        <article className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          {blog.imageId?.url && (
            <div className="w-full aspect-[21/9] bg-gray-100 relative">
              <img 
                src={blog.imageId.url} 
                alt={blog.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <header className="mb-8">
              <span className="text-brand-gold font-bold text-sm mb-3 block">
                {format(new Date(blog.createdAt), 'dd MMMM yyyy', { locale: ar })}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight">
                {blog.title}
              </h1>
            </header>
            
            <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-brand-dark font-cairo whitespace-pre-wrap leading-relaxed">
              {blog.description}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-brand-dark font-bold">
                  <Share2 className="h-5 w-5 text-brand-gold" />
                  <span>شارك المقالة:</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('تم نسخ الرابط بنجاح');
                    }}
                    className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-200 hover:text-brand-dark transition-colors"
                    title="نسخ الرابط"
                  >
                    <LinkIcon className="h-5 w-5" />
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    title="شارك على فيسبوك (يتطلب رابط عام)"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + '\n\n' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                    title="شارك على واتساب"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
