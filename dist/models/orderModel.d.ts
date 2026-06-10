import { Order, OrderDetail } from '../types/index.js';
declare const createOrderRecord: (user_id: string, pooja_id: string, total_amount: number, booking_date: string, booking_time: string, payment_status: string, address: string, phone_number: string) => Promise<Order>;
declare const getOrders: (user_id: string) => Promise<OrderDetail[]>;
declare const getTotalOrders: () => Promise<OrderDetail[]>;
export { createOrderRecord, getOrders, getTotalOrders };
//# sourceMappingURL=orderModel.d.ts.map