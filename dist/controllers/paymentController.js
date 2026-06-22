import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { createOrderWithPayment } from "../models/orderModel.js";
import { sendSms } from "../utils/twilioClient.js";
const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Payment order creation failed" });
    }
};
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, pooja_id, total_amount, booking_date, booking_time, phone_number, address } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
            .update(sign.toString())
            .digest("hex");
        if (razorpay_signature === expectedSign) {
            const order = await createOrderWithPayment(user_id, pooja_id, total_amount, booking_date, booking_time, "paid", address, phone_number, razorpay_payment_id);
            const message = `Hi! Your order #${order.id} has been successfully placed with Agraharam. Total amount : ₹${order.total_amount / 100}. We'll update you when it's confirmed.`;
            console.log("twilio message is..", message);
            try {
                const twResp = await sendSms({ to: `+91${phone_number}`, body: message });
                console.log("SMS sent:", twResp.sid);
            }
            catch (smsErr) {
                console.error("❌ SMS failed:", smsErr.message);
            }
            console.log("order creation has been done order id is " + order.id);
            res.json({
                success: true,
                message: "Payment verified and stored successfully",
                orderId: order.id,
            });
        }
        else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Payment verification failed" + JSON.stringify(error) });
    }
};
export { createOrder, verifyPayment };
//# sourceMappingURL=paymentController.js.map