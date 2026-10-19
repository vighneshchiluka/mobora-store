import {identity,json,sameOrigin} from '@/lib/commerce';
import {getDb} from '@/db';
import {customers} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {z} from 'zod';
export async function GET(){const user=await identity();if(!user)return json({user:null});const profile=(await getDb().select().from(customers).where(eq(customers.id,user.userId)).limit(1))[0]||null;return json({user:{name:user.displayName,email:user.email,admin:user.admin},profile})}
export async function POST(r:Request){if(!sameOrigin(r))return json({error:'Invalid origin.'},403);const u=await identity();if(!u)return json({error:'Please sign in first.'},401);const data=z.object({name:z.string().trim().min(2).max(100),phone:z.string().regex(/^[6-9]\d{9}$/)}).safeParse(await r.json().catch(()=>null));if(!data.success)return json({error:'Enter your name and a valid 10-digit Indian mobile number.'},400);const now=new Date().toISOString();await getDb().insert(customers).values({id:u.userId,email:u.email,...data.data,created:now,updated:now}).onConflictDoUpdate({target:customers.id,set:{...data.data,email:u.email,updated:now}});return json({ok:true})}
