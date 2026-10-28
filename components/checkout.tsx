'use client';

import {useState,useEffect,FormEvent} from 'react';
import Link from '@/components/site-link';
import {ShoppingBag,LockKeyhole,ArrowRight,Check,Trash2} from 'lucide-react';
import ShopShell from './shop-shell';
import {products} from '@/lib/catalog';
import type {CartItem} from '@/lib/cart';
import {payOrder} from '@/lib/pay-client';

export const money=(n:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:n%100?2:0,maximumFractionDigits:2}).format(n/100);

export default function Checkout(){
  const [bag,setBag]=useState<CartItem[]>([]);
  const [account,setAccount]=useState<any>(null);
  const [config,setConfig]=useState<any>(null);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [order,setOrder]=useState('');
  const [paid,setPaid]=useState(false);
  const [requestKey]=useState(()=>typeof crypto!=='undefined'?crypto.randomUUID():'');

  useEffect(()=>{
    try{
      const rows=JSON.parse(localStorage.getItem('mobora-bag')||'[]');
      if(Array.isArray(rows))setBag(rows.filter((item:unknown)=>typeof item==='object'&&item!==null&&products.some(product=>product.id===(item as CartItem).id)&&Number.isInteger((item as CartItem).quantity)&&((item as CartItem).quantity)>0));
    }catch{}
    void Promise.all([fetch('/api/account').then(response=>response.json()),fetch('/api/payments').then(response=>response.json())]).then(([account,config])=>{setAccount(account);setConfig(config)}).catch(()=>setError('Could not load checkout. Please refresh.'));
  },[]);

  const subtotal=bag.reduce((sum,item)=>sum+(products.find(product=>product.id===item.id)?.price||0)*100*item.quantity,0);

  function remove(index:number){
    const next=bag.filter((_,itemIndex)=>itemIndex!==index);
    setBag(next);
    localStorage.setItem('mobora-bag',JSON.stringify(next));
  }

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setBusy(true);
    setError('');
    const form=new FormData(event.currentTarget);
    try{
      const response=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requestKey,items:bag,address:{line1:form.get('line1'),line2:form.get('line2'),city:form.get('city'),state:form.get('state'),pincode:form.get('pincode')}})});
      const body=await response.json() as any;
      if(!response.ok)throw new Error(body.error);
      setOrder(body.id);
      localStorage.setItem('mobora-bag','[]');
      if(body.paymentReady)setPaid(await payOrder(body.id));
    }catch(error){
      setError(error instanceof Error?error.message:'Could not complete checkout.');
    }finally{
      setBusy(false);
    }
  }

  return <ShopShell>
    <p className="page-eyebrow">A FEW DETAILS. THEN IT’S YOURS.</p>
    <h1>Make it yours<span className="accent">.</span></h1>
    <div className="checkout-steps"><span><Check size={14}/> Your bag</span><i/><span className="active">02 · Delivery</span><i/><span>03 · Payment</span></div>
    {error&&<p className="form-error" role="alert">{error}</p>}
    {order?<section className="surface empty-state">
      <Check size={38}/><h2>{paid?'Payment confirmed.':'Your order is saved.'}</h2>
      <p>{paid?'We’ve verified your payment with Razorpay. Follow fulfilment in My orders.':config?.ready?'Your payment is not confirmed yet. Check or retry in My orders.':'This is an order request. Payments are not connected, prices and shipping require confirmation. No charge has been made.'}</p>
      <code>{order}</code><Link className="primary" href="/orders">Track my order <ArrowRight size={17}/></Link>
    </section>:!account||!config?<p>Loading checkout…</p>:!bag.length?<section className="surface empty-state">
      <ShoppingBag size={40}/><h2>Room for something personal.</h2><p>Your bag is empty.</p>
      <Link className="primary" href="/mobile-cover">Explore covers <ArrowRight size={17}/></Link>
    </section>:<div className="checkout-grid">
      <section>
        {!account.user?<div className="surface"><h2>First, make yourself at home.</h2><p>Sign in and register your profile before placing an order.</p><Link className="primary" href="/account">Sign in / register <ArrowRight size={17}/></Link></div>:!account.profile?<div className="surface"><h2>One little introduction.</h2><p>Add your email, name and mobile number to finish registration.</p><Link className="primary" href="/account">Complete registration</Link></div>:<form className="surface commerce-form" onSubmit={submit}>
          <p className="page-eyebrow">DELIVER TO</p>
          <h2>{account.profile.name}</h2>
          <p className="small-note">{account.profile.email} · +91 {account.profile.phone} <Link href="/account">Edit profile</Link></p>
          <label>Address line 1<input name="line1" required minLength={5} maxLength={180} autoComplete="address-line1" placeholder="House / flat number, building, street"/></label>
          <label>Address line 2 <small>optional</small><input name="line2" maxLength={180} autoComplete="address-line2" placeholder="Area or landmark"/></label>
          <div className="form-row"><label>City<input name="city" defaultValue="Mumbai" required maxLength={80} autoComplete="address-level2"/></label><label>State<input name="state" defaultValue="Maharashtra" required maxLength={80} autoComplete="address-level1"/></label></div>
          <label>PIN code<input name="pincode" pattern="[1-9][0-9]{5}" inputMode="numeric" maxLength={6} autoComplete="postal-code" required placeholder="400001"/></label>
          <p className="checkout-notice">{config.ready?(config.testMode?'Razorpay test mode. Test payments only.':'Your payment will be processed securely by Razorpay.'):'Payments are not connected yet. Save an order request; availability, artwork, shipping and final price will be confirmed before payment.'}</p>
          <label className="checkout-consent"><input type="checkbox" required/>I agree to save my delivery details and artwork for this order. <Link href="/privacy">Privacy details</Link>.</label>
          <button className="primary full" disabled={busy}>{busy?'Saving your order…':config.ready?'Continue to secure payment':'Save order request'}<ArrowRight size={18}/></button>
        </form>}
      </section>
      <aside className="surface order-summary">
        <p className="page-eyebrow">YOUR LITTLE COLLECTION</p><h2>Order summary <span>{bag.length}</span></h2>
        {bag.map((item,index)=><div className="summary-item" key={index}><div><b>{products.find(product=>product.id===item.id)?.name}</b><small>{item.model} · Qty {item.quantity}</small>{item.design&&<small>Personal artwork saved</small>}</div><span>{money((products.find(product=>product.id===item.id)?.price||0)*100*item.quantity)}</span><button aria-label={'Remove '+item.name} onClick={()=>remove(index)}><Trash2 size={15}/></button></div>)}
        <div className="summary-total"><span>Subtotal</span><b>{money(subtotal)}</b></div>
        <div className="summary-total"><span>Delivery</span><span>{config.shippingConfigured?money(config.shipping):'To be confirmed'}</span></div>
        <div className="summary-total grand"><span>{config.ready?'Total':'Indicative total'}</span><b>{money(subtotal+(config.shipping||0))}</b></div>
        <div className="payment-badges"><span>UPI</span><span>GPay</span><span>Paytm</span><span>Visa</span><span>Mastercard</span><span>RuPay</span><span>Netbanking</span></div>
        <p className="small-note"><LockKeyhole size={12}/> {config.ready?'Methods available depend on Razorpay and your device.':'Available after the payment gateway is connected.'}</p>
      </aside>
    </div>}
  </ShopShell>;
}
