import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { contentApi } from '@/lib/content-api';
import { Blog } from '@/types/content';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    contentApi.getBlogs()
      .then(res => setBlogs(res.data?.data || res.data || []))
      .catch(() => toast.error('فشل تحميل المقالات'))
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
      <div className="container mx-auto px-4 py-12 max-w-5xl" dir="rtl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-brand-dark mb-4">المدونة</h1>
          <p className="text-gray-500">أحدث الأخبار والمقالات</p>
        </div>
        
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 py-10">لا توجد مقالات حالياً</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <Link 
                key={blog._id} 
                to={`/blogs/${blog._id}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {blog.imageId?.url ? (
                    <img 
                      src={blog.imageId.url} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-400 bg-gray-50">
                      لا توجد صورة
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs text-brand-gold font-bold mb-2">
                    {format(new Date(blog.createdAt), 'dd MMMM yyyy', { locale: ar })}
                  </span>
                  <h3 className="font-bold text-lg text-brand-dark mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                    {blog.description}
                  </p>
                  <div className="flex items-center text-brand-dark text-sm font-bold gap-1 group-hover:text-brand-gold transition-colors">
                    اقرأ المزيد
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
