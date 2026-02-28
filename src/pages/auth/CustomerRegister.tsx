import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCustomerAuth } from '../../contexts/CustomerAuthContext';
import { toast } from 'sonner';

export default function CustomerRegister() {
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', whatsapp: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useCustomerAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/transfer';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
      toast.success('تم إنشاء الحساب وتسجيل الدخول بنجاح');
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل إنشاء الحساب. تأكد من البيانات.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-cairo" dir="rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-dark">
          إنشاء حساب جديد
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          أو{' '}
          <Link to="/auth/login" className="font-medium text-brand-gold hover:text-brand-gold/80">
            تسجيل الدخول لحسابك
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم بالكامل</label>
              <div className="mt-1">
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-brand-dark/20 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
              <div className="mt-1">
                <input id="phone" name="phone" type="text" required value={formData.phone} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-brand-dark/20 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">رقم الواتساب</label>
              <div className="mt-1">
                <input id="whatsapp" name="whatsapp" type="text" required value={formData.whatsapp} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-brand-dark/20 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-brand-dark/20 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm" />
              </div>
            </div>

            <div>
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-dark hover:bg-brand-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark disabled:opacity-50">
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
