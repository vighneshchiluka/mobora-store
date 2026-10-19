import {getDb} from '@/db';
import {enquiries} from '@/db/schema';
import {products,phones} from '@/lib/catalog';
import {env} from 'cloudflare:workers';
import {isCameraLayout,CameraLayout} from '@/lib/phone-preview';
import {z} from 'zod';
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.string().email().max(200),pincode:z.string().regex(/^\d{6}$/),items:z.array(z.object({id:z.string(),model:z.string().max(80),quantity:z.number().int().min(1).max(50),design:z.string().uuid().optional(),cameraLayout:z.custom<CameraLayout>(isCameraLayout).optional()})).min(1).max(20)});
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Invalid request origin.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>20000)return Response.json({error:'Request too large.'},{status:413});
 try{const parsed=schema.safeParse(await request.json());if(!parsed.success)return Response.json({error:'Please enter your name, valid email, six-digit PIN code and valid items.'},{status:400});const body=parsed.data;
 const items=[];for(const item of body.items){const product=products.find(p=>p.id===item.id);if(!product||((product.type!=='Accessories'||product.id==='glass')&&!Object.values(phones).flat().includes(item.model)))return Response.json({error:'Please check your product selection.'},{status:400});if(item.design&&(!env.BUCKET||!await env.BUCKET.head('designs/'+item.design)))return Response.json({error:'Design could not be found. Please upload it again.'},{status:400});items.push({id:product.id,name:product.name,model:product.type==='Accessories'&&product.id!=='glass'?'Universal':item.model,indicativePrice:product.price,quantity:item.quantity,design:item.design||null,cameraLayout:item.cameraLayout||null});}
 const id=crypto.randomUUID();await getDb().insert(enquiries).values({id,name:body.name,email:body.email,pincode:body.pincode,items:JSON.stringify(items),created:new Date().toISOString()});return Response.json({reference:id});
 }catch{return Response.json({error:'We could not save your enquiry. Please try again.'},{status:500});}
}


