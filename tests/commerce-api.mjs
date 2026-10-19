import assert from 'node:assert/strict';
// This integration test writes disposable records to the local preview only.
const origin='http://127.0.0.1:5173';
async function call(path,method='GET',body,auth=true,extra={}){const r=await fetch(origin+path,{method,headers:{...(auth?{Cookie:'__sites_local_auth=1'}:{}),...(method!=='GET'?{Origin:origin,'Content-Type':'application/json'}:{}),...extra},...(body?{body:JSON.stringify(body)}:{})});return {status:r.status,body:await r.text().then(t=>{try{return JSON.parse(t)}catch{return {error:t}}})}}
assert.equal((await call('/api/orders','GET',undefined,false)).status,401);
assert.equal((await call('/api/orders','GET',undefined,false,{'oai-authenticated-user-id':'admin','oai-authenticated-user-email':'moboraaccessories@gmail.com'})).status,401,'Caller headers cannot impersonate a user');
assert.equal((await call('/api/admin')).status,403,'Ordinary customers cannot access admin');
assert.equal((await call('/api/account','POST',{name:'QA',phone:'123'})).status,400);
assert.equal((await call('/api/account','POST',{name:'QA',phone:'9999999999'},true,{Origin:'https://untrusted.example'})).status,403);
assert.equal((await call('/api/account','POST',{name:'MOBORA QA Customer',phone:'9999999999'})).status,200);
assert.equal((await call('/api/wishlist','POST',{action:'add',ids:['coffee']})).status,200);
assert.ok((await call('/api/wishlist')).body.ids.includes('coffee'));
const checkout={requestKey:crypto.randomUUID(),address:{line1:'QA sample building, test street',line2:'Local test only',city:'Mumbai',state:'Maharashtra',pincode:'400001'},items:[{id:'charger',model:'Universal',quantity:2,price:1}]};
const placed=await call('/api/orders','POST',checkout);assert.equal(placed.status,201);assert.equal(placed.body.paymentReady,false);
const again=await call('/api/orders','POST',checkout);assert.equal(again.body.id,placed.body.id,'Retry must not duplicate orders');
const order=(await call('/api/orders')).body.orders.find(x=>x.id===placed.body.id);assert.equal(order.subtotal,99800,'Server prices override browser prices');assert.equal(order.paymentStatus,'unconfigured');assert.equal(order.status,'requested');
assert.equal((await call('/api/payments','POST',{id:order.id})).status,503,'Disconnected gateway cannot mark an order paid');
assert.equal((await call('/api/admin','PATCH',{id:order.id,status:'shipped',tracking:'TEST',carrier:'TEST'})).status,403);
assert.equal((await call('/api/orders','POST',{...checkout,requestKey:crypto.randomUUID(),items:[{id:'yourstory',model:'Realme 8 (4G)',quantity:1}]})).status,400,'Custom covers require saved artwork');
console.log('PASS: registration, identity spoofing protection, origin checks, wishlist persistence, server pricing, idempotency, admin protection, payment gating and artwork requirement.');

