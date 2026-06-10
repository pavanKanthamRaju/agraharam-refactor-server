import db from '../config/db.js';
import { Payment } from '../types/index.js';

const createPaymentRecord = async (
    order_id: string,
    amount: number,
    transaction_id: string,
    status: string
): Promise<Payment> => {
    const payload = {
        order_id,
        amount,
        transaction_id,
        status,
        paid_at: new Date().toISOString()
    };
    const result = await db.insert("payments", payload);
    console.log("PAYMENT result..." + JSON.stringify(result));
    return result;
};

export { createPaymentRecord };
