export type TransferOrderStatus = 'PENDING_CONFIRMATION' | 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';

export interface TransferMethod {
  _id: string;
  name: string;
  code: string;
  category: string;
  enabled: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TransferQuote {
  available: boolean;
  fromMethod: { id: string; name: string; code: string };
  toMethod: { id: string; name: string; code: string };
  amount: number;
  /** Fee charged. Negative value means cashback (client receives money back). */
  fee: number;
  total: number;
  /** FEE = client pays fee; CASHBACK = client receives money back */
  benefitType: 'FEE' | 'CASHBACK' | null;
  /** Minimum transfer amount for this route (null = no limit) */
  minAmount: number | null;
  /** Maximum transfer amount for this route (null = no limit) */
  maxAmount: number | null;
  feeRuleId: string | null;
  message?: string;
}

export interface TransferOrder {
  _id: string;
  orderNumber: string;
  fromMethodId: TransferMethod | string;
  toMethodId: TransferMethod | string;
  amount: number;
  fee: number;
  total: number;
  status: TransferOrderStatus;
  customerName?: string;
  customerPhone?: string;
  customerWhatsapp?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransferConfirmResult {
  order: TransferOrder;
  whatsapp: {
    messageText: string;
    encodedMessage: string;
    whatsappUrl: string;
    brokerPhone: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
