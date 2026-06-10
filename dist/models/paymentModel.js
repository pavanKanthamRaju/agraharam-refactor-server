import db from '../config/db.js';
const createPaymentRecord = async (order_id, amount, transaction_id, status) => {
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
//# sourceMappingURL=paymentModel.js.map