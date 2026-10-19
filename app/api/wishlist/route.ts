import {identity,json,sameOrigin} from '@/lib/commerce';
import {getDb} from '@/db';
import {wishlist} from '@/db/schema';
import {eq,and} from 'drizzle-orm';
import {products} from '@/lib/catalog';
import {z} from 'zod';
export async function GET(){const u=await identity();if(!u)return json({ids:[],signedIn:false});return json({ids:(await getDb().select().from(wishlist).where(eq(wishlist.userId,u.userId))).map(x=>x.productId),signedIn:true})}
export async function POST(r:Request){if(!sameOrigin(r))return json({error:'Invalid origin.'},403);const u=await identity();if(!u)return json({error:'Please sign in.'},401);const b=z.object({ids:z.array(z.string()).max(100),action:z.enum(['add','remove'])}).safeParse(await r.json().catch(()=>null));if(!b.success||b.data.ids.some(id=>!products.some(p=>p.id===id)))return json({error:'Invalid wishlist.'},400);for(const id of new Set(b.data.ids)){if(b.data.action==='add')await getDb().insert(wishlist).values({userId:u.userId,productId:id,created:new Date().toISOString()}).onConflictDoNothing();else await getDb().delete(wishlist).where(and(eq(wishlist.userId,u.userId),eq(wishlist.productId,id)))}return json({ok:true})}
