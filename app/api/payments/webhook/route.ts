import {env} from 'cloudflare:workers';
import {verifyHmac,json,reconcileOrder} from '@/lib/commerce';
import {getDb} from '@/db';
import {orders} from '@/db/schema';
import {eq} from 'drizzle-orm';
export async function POST(r:Request){if(!env.RAZORPAY_WEBHOOK_SECRET)return json({error:'Webhook not configured.'},503);if(Number(r.headers.get('content-length')||0)>100000)return json({error:'Payload too large.'},413);const raw=await r.text();if(raw.length>100000||!await verifyHmac(env.RAZORPAY_WEBHOOK_SECRET,raw,r.headers.get('x-razorpay-signature')||''))return json({error:'Invalid signature.'},400);try{const b=JSON.parse(raw);if(b.event==='payment.captured'||b.event==='order.paid'){const id=b.payload?.payment?.entity?.order_id||b.payload?.order?.entity?.id;if(typeof id==='string'){const row=(await getDb().select().from(orders).where(eq(orders.gatewayOrder,id)).limit(1))[0];if(row)await reconcileOrder(row)}}return json({ok:true})}catch{return json({error:'Webhook processing failed; retry.'},503)}}
