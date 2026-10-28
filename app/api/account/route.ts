import {identity,json,sameOrigin} from '@/lib/commerce';
import {getDb} from '@/db';
import {customers,wishlist} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {z} from 'zod';

const profileSchema=z.object({
  email:z.string().trim().email().max(254),
  name:z.string().trim().min(2).max(100),
  phone:z.string().regex(/^[6-9]\d{9}$/),
});

export async function GET(){
  const user=await identity();
  if(!user)return json({user:null});
  const profile=(await getDb().select().from(customers).where(eq(customers.id,user.userId)).limit(1))[0]||null;
  return json({user:{name:user.displayName,email:user.email,admin:user.admin},profile});
}
export async function POST(request:Request){
  if(!sameOrigin(request))return json({error:'Invalid origin.'},403);
  const user=await identity();
  if(!user)return json({error:'Please sign in first.'},401);
  const parsed=profileSchema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success)return json({error:'Enter a valid email, your name and a valid 10-digit Indian mobile number.'},400);
  const now=new Date().toISOString();
  await getDb().insert(customers).values({id:user.userId,...parsed.data,created:now,updated:now}).onConflictDoUpdate({target:customers.id,set:{...parsed.data,updated:now}});
  return json({ok:true});
}

export async function DELETE(request:Request){
  if(!sameOrigin(request))return json({error:'Invalid origin.'},403);
  const user=await identity();
  if(!user)return json({ok:true});
  const db=getDb();
  await db.delete(wishlist).where(eq(wishlist.userId,user.userId));
  await db.delete(customers).where(eq(customers.id,user.userId));
  return json({ok:true});
}
