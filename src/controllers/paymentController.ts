import { Request, Response } from 'express';
import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { createOrderRecord } from "../models/orderModel.js";
import { createPaymentRecord } from "../models/paymentModel.js";
import { sendSms } from "../utils/twilioClient.js";
import { RazorpayPaymentVerification } from '../types/index.js';

const createOrder = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Payment order creation failed" });
    }
};

const verifyPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            user_id,
            pooja_id,
            total_amount,
            booking_date,
            booking_time,
            phone_number,
            address
        }: RazorpayPaymentVerification = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            const order = await createOrderRecord(
                user_id,
                pooja_id,
                total_amount,
                booking_date,
                booking_time,
                "paid",
                address,
                phone_number
            );

            const message = `Hi! Your order #${order.id} has been successfully placed with Agraharam. Total amount : ₹${order.total_amount / 100}. We'll update you when it's confirmed.`;
            console.log("twilio message is..", message);

            await createPaymentRecord(
                order.id,
                total_amount,
                razorpay_payment_id,
                "success"
            );

            try {
                const twResp = await sendSms({ to: `+91${phone_number}`, body: message });
                console.log("SMS sent:", twResp.sid);
            } catch (smsErr: any) {
                console.error("❌ SMS failed:", smsErr.message);
            }

            console.log("order creation has been done order id is " + order.id);
            res.json({
                success: true,
                message: "Payment verified and stored successfully",
                orderId: order.id,
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error: any) {
        res.status(500).json({ message: "Payment verification failed" + JSON.stringify(error) });
    }
};

export { createOrder, verifyPayment };
