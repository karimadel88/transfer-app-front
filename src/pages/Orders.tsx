import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { transferApi } from '@/lib/api';
import { TransferOrder, TransferOrderStatus, PaginatedResponse } from '@/types/transfer';
import PageLayout from '@/components/PageLayout';
import { toast } from 'sonner';
import { CustomerProtectedRoute } from '@/components/CustomerProtectedRoute';
import {
  ClipboardList,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Eye,
  X,
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const statusConfig: Record<TransferOrderStatus, { label: string; bg: string }> = {
  PENDING_CONFIRMATION: { label: 'بانتظار التأكيد', bg: 'bg-yellow-100 text-yellow-700' },
  SUBMITTED: { label: 'تم الإرسال', bg: 'bg-blue-100 text-blue-700' },
  IN_PROGRESS: { label: 'قيد التنفيذ', bg: 'bg-indigo-100 text-indigo-700' },
  COMPLETED: { label: 'مكتمل', bg: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'ملغي', bg: 'bg-gray-100 text-gray-600' },
  REJECTED: { label: 'مرفوض', bg: 'bg-red-100 text-red-700' },
};

const statusOptions = [
  { value: 'ALL', label: 'الكل' },
  { value: 'SUBMITTED', label: 'تم الإرسال' },
  { value: 'IN_PROGRESS', label: 'قيد التنفيذ' },
  { value: 'COMPLETED', label: 'مكتمل' },
  { value: 'CANCELLED', label: 'ملغي' },
  { value: 'REJECTED', label: 'مرفوض' },
];

function StatusBadge({ status }: { status: TransferOrderStatus }) {
  const c = statusConfig[status] || { label: status, bg: 'bg-gray-100' };
  return <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${c.bg}`}>{c.label}</span>;
}

function getMethodName(method: any): string {
  if (typeof method === 'object' && method?.name) return method.name;
  return String(method);
}

function OrdersContent() {
  const [orders, setOrders] = useState<TransferOrder[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TransferOrder | null>(null);

  const fetchOrders = async (pageNum: number, status?: string) => {
    setIsLoading(true);
    try {
      const params: any = { page: pageNum, limit: 10 };
      if (status && status !== 'ALL') params.status = status;
      const res = await transferApi.getOrders(params);
      const data: PaginatedResponse<TransferOrder> = res.data;
      setOrders(data.data || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
      setPage(data.page || 1);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل في تحميل الطلبات');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1, 'ALL');
  }, []);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    fetchOrders(1, value);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-brand-dark flex items-center gap-2">
              <ClipboardList className="h-7 w-7 text-brand-gold" />
              طلباتي
            </h1>
            <p className="text-gray-500 text-sm mt-1">تتبع حالة طلبات التحويل</p>
          </div>
          <Link
            to="/transfer"
            className="inline-flex items-center gap-1 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-dark font-bold px-4 py-2 rounded-xl transition-colors text-sm border border-brand-gold/30"
          >
            <ArrowLeftRight className="h-4 w-4" />
            تحويل جديد
          </Link>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-bold text-brand-dark text-sm">الطلبات ({total})</h3>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs appearance-none pr-8 focus:ring-2 focus:ring-brand-gold/30 outline-none"
              >
                {statusOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">لا توجد طلبات</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="p-4 hover:bg-gray-50/50 cursor-pointer transition-colors flex items-center gap-4"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">
                          {format(new Date(order.createdAt), 'dd/MM/yyyy', { locale: ar })}
                        </span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm font-bold text-brand-dark truncate">
                        {getMethodName(order.fromMethodId)} → {getMethodName(order.toMethodId)}
                      </p>
                    </div>
                    <div className="text-left shrink-0">
                      <p className="text-sm font-black text-brand-dark">{order.total.toLocaleString('ar-EG')} ج.م</p>
                      <p className="text-[10px] text-gray-400">رسوم: {order.fee.toLocaleString('ar-EG')}</p>
                    </div>
                    <Eye className="h-4 w-4 text-gray-300 shrink-0" />
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-100">
                  <button
                    disabled={page <= 1}
                    onClick={() => fetchOrders(page - 1, statusFilter)}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-gray-400">صفحة {page} من {totalPages}</span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => fetchOrders(page + 1, statusFilter)}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Order detail modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedOrder(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="font-bold text-brand-dark">تفاصيل الطلب</h3>
                <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">رقم الطلب</span>
                  <span className="font-bold text-brand-dark">{selectedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">الحالة</span>
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">من</span>
                  <span className="font-medium">{getMethodName(selectedOrder.fromMethodId)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">إلى</span>
                  <span className="font-medium">{getMethodName(selectedOrder.toMethodId)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">المبلغ</span>
                  <span>{selectedOrder.amount.toLocaleString('ar-EG')} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">الرسوم</span>
                  <span className="text-orange-600">{selectedOrder.fee.toLocaleString('ar-EG')} ج.م</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-3">
                  <span>الإجمالي</span>
                  <span className="text-brand-gold">{selectedOrder.total.toLocaleString('ar-EG')} ج.م</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">التاريخ</span>
                  <span>{format(new Date(selectedOrder.createdAt), 'dd/MM/yyyy HH:mm', { locale: ar })}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default function Orders() {
  return (
    <CustomerProtectedRoute>
      <OrdersContent />
    </CustomerProtectedRoute>
  );
}
