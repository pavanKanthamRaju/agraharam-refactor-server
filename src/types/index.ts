// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string | null;
  role: 'user' | 'admin' | 'vendor';
  profile_image?: string | null;
  provider?: string | null;
  google_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  password?: string | null;
  role?: string;
  profile_image?: string | null;
  provider?: string | null;
  google_id?: string | null;
}

export interface UserCredentials {
  identifier: string;
  password: string;
}

// JWT Types
export interface JWTPayload {
  id: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface GoogleUserInfo {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}

// Order Types
export interface Order {
  id: string;
  user_id: string;
  pooja_id: string;
  total_amount: number;
  booking_date: string;
  booking_time: string;
  payment_status: 'pending' | 'paid' | 'failed';
  address: string;
  phone_number: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderRecord {
  user_id: string;
  pooja_id: string;
  total_amount: number;
  booking_date: string;
  booking_time: string;
  payment_status: string;
  address: string;
  phone_number: string;
}

export interface OrderDetail extends Order {
  transaction_id: string;
  status: string;
  paid_at?: Date;
  pooja_name: string;
  pooja_description: string;
  user_name?: string;
}

// Payment Types
export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  transaction_id: string;
  status: 'success' | 'failed' | 'pending';
  paid_at?: Date;
  created_at?: Date;
}

export interface PaymentRecord {
  order_id: string;
  amount: number;
  transaction_id: string;
  status: string;
}

export interface RazorpayPaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  user_id: string;
  pooja_id: string;
  total_amount: number;
  booking_date: string;
  booking_time: string;
  phone_number: string;
  address: string;
}

// Pooja Types
export interface Pooja {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Document Types
export interface Document {
  id: string;
  user_id: string;
  title: string;
  content?: string;
  file_path?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Item Types
export interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  created_at?: Date;
  updated_at?: Date;
}

// Nivedyam Types
export interface Nivedyam {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit?: string;
  image_url?: string;
  category_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface PoojaNivedyam {
  id: string;
  pooja_id: string;
  nivedyam_id: string;
  price: number;
  quantity?: string;
  units?: string;
  nivedyam_name?: string;
}


// Announcement Types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

// Rag Types (Retrieval Augmented Generation)
export interface RagDocument {
  id: string;
  content: string;
  embedding?: number[];
  metadata?: Record<string, any>;
  created_at?: Date;
}

// Express Request Extension
export interface AuthenticatedRequest extends Express.Request {
  user?: JWTPayload;
}

// Database Query Result
export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
  token?: string;
  user?: User;
  orderId?: string;
}

// Error Types
export interface AppErrorOptions {
  message: string;
  statusCode: number;
  isOperational?: boolean;
}
