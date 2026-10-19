import assert from 'node:assert/strict';
const origin='http://127.0.0.1:5173';
async function call(method='GET',body,auth=true){const r=await fetch(origin+'/api/admin',{method,headers:{...(auth?{Cookie:'__sites_local_auth=1'}:{}),Origin:origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});return {status:r.status,body:await r.json()}}
assert.equal((await call('GET',undefined,false)).status,403);
const list=await call();assert.equal(list.status,200);assert.ok(list.body.customers.some(c=>c.email==='seedy@sites.test'));
const row=list.body.orders.find(o=>o.status==='requested');assert.ok(row,'Run customer checkout test first.');
assert.equal((await call('PATCH',{id:row.id,status:'shipped',carrier:'QA',tracking:'TEST'})).status,409,'Unpaid orders cannot skip to shipment');
assert.equal((await call('PATCH',{id:row.id,status:'cancelled',carrier:'',tracking:''})).status,200);
const updated=(await call()).body.orders.find(o=>o.id===row.id);assert.equal(updated.status,'cancelled');assert.equal(updated.paymentStatus,'unconfigured');
console.log('PASS: admin identity required, customer/order visibility, guarded status transitions, cancellation persistence; no manual paid override.');
