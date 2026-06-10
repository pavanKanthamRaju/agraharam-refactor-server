import { Request, Response } from 'express';
import { createOrderRecord, getOrders, getTotalOrders } from "../models/orderModel.js";
import { sendSms } from "../utils/twilioClient.js";

const placeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, pooja_id, total_amount, booking_date, booking_time, phone_number, address } = req.body;

        if (!/^\d{10}$/.test(phone_number)) {
            res.status(400).json({ success: false, message: "Invalid phone number. Must be 10 digits." });
            return;
        }

        const newOrder = await createOrderRecord(
            user_id,
            pooja_id,
            total_amount,
            booking_date,
            booking_time,
            'pending',
            address,
            phone_number
        );

        const message = `Hi! Your order #${newOrder.id} has been placed with Agraharam. Total: ₹${newOrder.total_amount}. We'll update you when it's confirmed.`;
        console.log("twilio message is..", message);

        try {
            const twResp = await sendSms({ to: `+91${phone_number}`, body: message });
            console.log("SMS sent:", twResp.sid);
        } catch (smsErr: any) {
            console.error("❌ SMS failed:", smsErr.message);
        }

        console.log("order creation has been done order id is " + newOrder.id);
        res.status(201).json({ success: true, order: newOrder });
    } catch (err: any) {
        console.error("Error creating order:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.params;
        const result = await getOrders(user_id);
        res.json({ success: true, orders: result });
    } catch (error: any) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user orders" });
    }
};

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getTotalOrders();
        res.json({ success: true, orders: result });
    } catch (error: any) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch all orders" });
    }
};

export { placeOrder, getUserOrders, getAllOrders };
