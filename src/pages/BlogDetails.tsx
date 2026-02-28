import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { contentApi } from '@/lib/content-api';
import { Blog } from '@/types/content';
import { Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

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

  return (
    <PageLayout>
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
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
