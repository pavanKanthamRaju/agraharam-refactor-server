import 'dotenv/config';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

interface SendSmsOptions {
  to: string;
  body: string;
  from?: string;
}

async function sendSms({ to, body, from = process.env.TWILIO_FROM_NUMBER }: SendSmsOptions) {
    console.log("send sms has been hit...")
    if (!to) throw new Error('Missing "to" phone number');
    // ensure E.164 format on `to` in your caller
    return client.messages.create({ to, from, body });
}

export { sendSms };
