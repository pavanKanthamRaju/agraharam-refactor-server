import 'dotenv/config';
interface SendSmsOptions {
    to: string;
    body: string;
    from?: string;
}
declare function sendSms({ to, body, from }: SendSmsOptions): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
export { sendSms };
//# sourceMappingURL=twilioClient.d.ts.map