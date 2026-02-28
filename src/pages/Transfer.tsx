import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { transferApi } from '@/lib/api';
import { TransferMethod, TransferQuote, TransferConfirmResult, TransferOrderStatus } from '@/types/transfer';
import PageLayout from '@/components/PageLayout';
import { toast } from 'sonner';
import { useCustomerAuth } from '@/contexts/CustomerAuthContext';
import { CustomerProtectedRoute } from '@/components/CustomerProtectedRoute';
import {
  ArrowLeftRight,
  Loader2,
  CheckCircle,
  ClipboardList,
  AlertTriangle,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';

/* ─── StatusBadge ─── */
const statusConfig: Record<TransferOrderStatus, { label: string; bg: string }> = {
  PENDING_CONFIRMATION: { label: 'بانتظار التأكيد', bg: 'bg-yellow-100 text-yellow-700' },
  SUBMITTED: { label: 'تم الإرسال', bg: 'bg-blue-100 text-blue-700' },
  IN_PROGRESS: { label: 'قيد التنفيذ', bg: 'bg-indigo-100 text-indigo-700' },
  COMPLETED: { label: 'مكتمل', bg: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'ملغي', bg: 'bg-gray-100 text-gray-600' },
  REJECTED: { label: 'مرفوض', bg: 'bg-red-100 text-red-700' },
};

function StatusBadge({ status }: { status: TransferOrderStatus }) {
  const c = statusConfig[status] || { label: status, bg: 'bg-gray-100' };
  return <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${c.bg}`}>{c.label}</span>;
}

type Step = 'form' | 'quote' | 'result';

function TransferContent() {
  const [methods, setMethods] = useState<TransferMethod[]>([]);
  const [isLoadingMethods, setIsLoadingMethods] = useState(true);
  const [fromMethodId, setFromMethodId] = useState('');
  const [toMethodId, setToMethodId] = useState('');
  const [amount, setAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [step, setStep] = useState<Step>('form');
  const [quote, setQuote] = useState<TransferQuote | null>(null);
  const [result, setResult] = useState<TransferConfirmResult | null>(null);
  const [isQuoting, setIsQuoting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const { customer } = useCustomerAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    transferApi.getMethods()
      .then((res) => setMethods(res.data || []))
      .catch(() => toast.error('فشل في تحميل طرق التحويل'))
      .finally(() => setIsLoadingMethods(false));
  }, []);

  useEffect(() => {
    if (customer) {
      if (!customerName) setCustomerName(customer.name);
      if (!customerPhone) setCustomerPhone(customer.phone);
    }
  }, [customer]);

  const handleGetQuote = async () => {
    if (!customer) {
      toast.error('يرجى تسجيل الدخول أولاً لإجراء التحويل');
      return navigate('/auth/login', { state: { from: location } });
    }

    if (!fromMethodId || !toMethodId) return toast.error('يرجى اختيار طريقة التحويل');
    if (fromMethodId === toMethodId) return toast.error('يجب أن تختلف طريقة الإرسال عن الاستلام');
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return toast.error('يرجى إدخال مبلغ أكبر من صفر');

    setIsQuoting(true);
    try {
      const res = await transferApi.getQuote({ fromMethodId, toMethodId, amount: parsed });
      setQuote(res.data);
      setStep('quote');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'فشل في الحصول على التسعير');
    } finally {
      setIsQuoting(false);
    }
  };

  const handleConfirm = async () => {
    if (!quote?.available) return;
    setIsConfirming(true);
    try {
      const res = await transferApi.confirm({
        fromMethodId, toMethodId,
        amount: parseFloat(amount),
        customerName: customerName || (customer?.name || ''),
        customerPhone: customerPhone || (customer?.phone || ''),
        customerWhatsapp: customerPhone || (customer?.phone || ''),
      });
      setResult(res.data);
      setStep('result');
      toast.success('تم إنشاء طلب التحويل بنجاح');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'فشل في تأكيد التحويل');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleReset = () => {
    setFromMethodId(''); setToMethodId(''); setAmount('');
    setCustomerName(''); setCustomerPhone('');
    setQuote(null); setResult(null); setStep('form');
  };

  const filteredFrom = methods.filter((m) => m._id !== toMethodId);
  const filteredTo = methods.filter((m) => m._id !== fromMethodId);

  if (isLoadingMethods) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center py-32">
          <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (step === 'result' && result) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center text-white">
              <CheckCircle className="h-14 w-14 mx-auto mb-3" />
              <h2 className="text-xl font-black">تم إنشاء الطلب بنجاح!</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">رقم الطلب</span>
                <span className="font-bold text-brand-dark">{result.order.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">الحالة</span>
                <StatusBadge status={result.order.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">المبلغ</span>
                <span className="font-medium">{result.order.amount.toLocaleString('ar-EG')} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">الرسوم</span>
                <span className="font-medium text-orange-600">{result.order.fee.toLocaleString('ar-EG')} ج.م</span>
              </div>
              <div className="flex justify-between text-lg font-black border-t pt-3">
                <span>الإجمالي</span>
                <span className="text-brand-gold">{result.order.total.toLocaleString('ar-EG')} ج.م</span>
              </div>

              <button
                onClick={() => window.open(`https://wa.me/201009531974?text=${encodeURIComponent('مرحباً، أريد متابعة التحويل رقم: ' + result.order.orderNumber)}`, '_blank')}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل معنا عبر الواتس لمتابعة التحويل
              </button>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">يتم إتمام التحويلات يدوياً عبر محادثتنا على واتساب.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={handleReset} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                  تحويل جديد
                </button>
                <Link to="/orders" className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-1">
                  <ClipboardList className="h-4 w-4" />
                  طلباتي
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-dark mx-auto mb-4 flex items-center justify-center shadow-xl">
            <ArrowLeftRight className="h-8 w-8 text-brand-gold" />
          </div>
          <h1 className="text-2xl font-black text-brand-dark">تحويل الأموال</h1>
          <p className="text-gray-500 text-sm mt-1">حوّل أموالك بين المحافظ الإلكترونية بسهولة</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-5">
          {/* From Method */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">التحويل من</label>
            <div className="relative">
              <select
                value={fromMethodId}
                onChange={(e) => { setFromMethodId(e.target.value); if (step === 'quote') setStep('form'); }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all"
              >
                <option value="">اختر طريقة...</option>
                {filteredFrom.map((m) => <option key={m._id} value={m._id}>{m.name}</option>)}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* To Method */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">التحويل إلى</label>
            <div className="relative">
              <select
                value={toMethodId}
                onChange={(e) => { setToMethodId(e.target.value); if (step === 'quote') setStep('form'); }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all"
              >
                <option value="">اختر طريقة...</option>
                {filteredTo.map((m) => <option key={m._id} value={m._id}>{m.name}</option>)}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">المبلغ (ج.م) *</label>
            <input
              type="number"
              min="1"
              step="any"
              placeholder="0.00"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); if (step === 'quote') setStep('form'); }}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all"
            />
          </div>

          {/* Optional fields */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">الاسم </label>
            <input
              placeholder="اسمك"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">رقم الهاتف / واتساب </label>
            <input
              placeholder="01012345678"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all"
            />
          </div>

          {step === 'form' && (
            <button
              onClick={handleGetQuote}
              disabled={isQuoting || !fromMethodId || !toMethodId || !amount}
              className="w-full bg-brand-gold hover:bg-brand-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-brand-dark font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20"
            >
              {isQuoting && <Loader2 className="h-5 w-5 animate-spin" />}
              احصل على التسعير
            </button>
          )}

          {step === 'quote' && quote && (
            <div className="space-y-4">
              {/* Quote card */}
              <div className={`rounded-xl p-4 border ${quote.available ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className={`h-5 w-5 ${quote.available ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`font-bold text-sm ${quote.available ? 'text-green-700' : 'text-red-700'}`}>
                    {quote.available ? 'التحويل متاح' : 'التحويل غير متاح'}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">المبلغ</span>
                    <span className="font-medium">{quote.amount.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                  {quote.available && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500">الرسوم</span>
                        <span className="font-medium text-orange-600">{quote.fee.toLocaleString('ar-EG')} ج.م</span>
                      </div>
                      <div className="flex justify-between font-bold text-base border-t pt-2">
                        <span>الإجمالي</span>
                        <span className="text-brand-dark">{quote.total.toLocaleString('ar-EG')} ج.م</span>
                      </div>
                    </>
                  )}
                  {!quote.available && quote.message && (
                    <p className="text-red-600 text-xs mt-1">{quote.message}</p>
                  )}
                </div>
              </div>

              {quote.available && (
                <button
                  onClick={handleConfirm}
                  disabled={isConfirming}
                  className="w-full bg-brand-dark hover:bg-brand-teal disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isConfirming && <Loader2 className="h-5 w-5 animate-spin" />}
                  تأكيد التحويل
                </button>
              )}
              <button
                onClick={() => setStep('form')}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                تعديل البيانات
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/orders" className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-gold-light text-sm font-medium transition-colors">
            <ClipboardList className="h-4 w-4" />
            تتبع طلباتك
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

export default function Transfer() {
  return (
    <CustomerProtectedRoute>
      <TransferContent />
    </CustomerProtectedRoute>
  );
}
