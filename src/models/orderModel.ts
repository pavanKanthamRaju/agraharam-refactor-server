import db from '../config/db.js';
import { Order, OrderDetail } from '../types/index.js';

const createOrderRecord = async (
    user_id: string,
    pooja_id: string,
    total_amount: number,
    booking_date: string,
    booking_time: string,
    payment_status: string,
    address: string,
    phone_number: string
): Promise<Order> => {
    const payload = {
        user_id,
        pooja_id,
        total_amount,
        booking_date,
        booking_time,
        payment_status,
        address,
        phone_number
    };
    const result = await db.insert("orders", payload);
    console.log("ORDER result..." + JSON.stringify(result));
    return result;
};

const getOrders = async (user_id: string): Promise<OrderDetail[]> => {
    const query = `
      SELECT 
        o.id AS order_id,
        o.total_amount,
        o.booking_date,
        o.booking_time,
        o.payment_status AS order_payment_status,
        o.address,
        o.created_at,
        p.transaction_id,
        p.status AS payment_status,
        p.paid_at,
        pooja.name AS pooja_name,
        pooja.description AS pooja_description
      FROM orders o
      JOIN payments p ON o.id = p.order_id
      JOIN poojas pooja ON o.pooja_id = pooja.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `;
    const result = await db.query(query, [user_id]);
    console.log(`Fetched ${result.rows.length} orders for user ${user_id}`);
    return result.rows;
};

const getTotalOrders = async (): Promise<OrderDetail[]> => {
    const result = await db.query(
        `
        SELECT 
  o.id AS order_id,
  o.user_id,
  u.name AS user_name,
  o.pooja_id,
  p.name AS pooja_name,
  o.total_amount,
  o.booking_date,
  o.booking_time,
  o.payment_status,
  o.address,
  o.phone_number,
  o.created_at
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN poojas p ON o.pooja_id = p.id
ORDER BY o.created_at DESC
      `
    );
    return result.rows;
};

const createOrderWithPayment = async (
    user_id: string,
    pooja_id: string,
    total_amount: number,
    booking_date: string,
    booking_time: string,
    payment_status: string,
    address: string,
    phone_number: string,
    razorpay_payment_id: string
): Promise<Order> => {
    const query = `
      WITH inserted_order AS (
        INSERT INTO "orders" ("user_id", "pooja_id", "total_amount", "booking_date", "booking_time", "payment_status", "address", "phone_number")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      ), inserted_payment AS (
        INSERT INTO "payments" ("order_id", "amount", "transaction_id", "status", "paid_at")
        SELECT id, $3, $9, 'success', NOW()
        FROM inserted_order
        RETURNING *
      )
      SELECT * FROM inserted_order;
    `;
    const values = [
        user_id,
        pooja_id,
        total_amount,
        booking_date,
        booking_time,
        payment_status,
        address,
        phone_number,
        razorpay_payment_id
    ];
    const result = await db.query(query, values);
    console.log("ORDER WITH PAYMENT result..." + JSON.stringify(result));
    return result.rows[0];
};

export { createOrderRecord, getOrders, getTotalOrders, createOrderWithPayment };

