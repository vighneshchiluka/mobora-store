import {isCameraLayout} from '@/lib/phone-preview';
import {env} from 'cloudflare:workers';
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Invalid request origin.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>6000000)return Response.json({error:'Please use an image smaller than 5 MB.'},{status:413});
 const form=await request.formData();const image=form.get('image');
 if(!(image instanceof File)||image.size>5000000||!['image/jpeg','image/png','image/webp'].includes(image.type))return Response.json({error:'Choose a JPG, PNG or WebP image under 5 MB.'},{status:400});
 const bytes=new Uint8Array(await image.arrayBuffer());const valid=(bytes[0]===255&&bytes[1]===216&&bytes[2]===255)||(bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71)||(new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP');
 if(!valid)return Response.json({error:'This file is not a supported image.'},{status:400});
 if(!env.BUCKET)return Response.json({error:'Artwork storage is temporarily unavailable.'},{status:503});
 const id=crypto.randomUUID();
 await env.BUCKET.put('designs/'+id,bytes,{httpMetadata:{contentType:image.type},customMetadata:{text:String(form.get('text')||'').slice(0,40),model:String(form.get('model')||'').slice(0,80),background:String(form.get('background')||'').slice(0,20),cameraLayout:isCameraLayout(form.get('cameraLayout'))?String(form.get('cameraLayout')):''}});
 return Response.json({id});
}
