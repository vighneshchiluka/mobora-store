'use client';

import {useEffect,useState,FormEvent} from 'react';
import Link from '@/components/site-link';
import {UserRound,Package,Heart,ArrowUpRight,ShieldCheck} from 'lucide-react';
import ShopShell from './shop-shell';
import SignOutButton from './sign-out-button';

type Account={user:null|{name:string;email:string;admin:boolean};profile:null|{email:string;name:string;phone:string}};

export default function Account(){
  const [data,setData]=useState<Account|null>(null);
  const [error,setError]=useState('');
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);

  async function load(){
    try{
      const response=await fetch('/api/account',{cache:'no-store'});
      if(!response.ok)throw new Error('Unable to load your account.');
      setData(await response.json());
    }catch(error){
      setError(error instanceof Error?error.message:'Unable to load your account.');
    }
  }

  useEffect(()=>{void load()},[]);


  async function save(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    const form=new FormData(event.currentTarget);
    try{
      const response=await fetch('/api/account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:form.get('email'),name:form.get('name'),phone:form.get('phone')})});
      const body=await response.json() as any;
      if(!response.ok)throw new Error(body.error);
      await load();
      window.dispatchEvent(new Event('mobora-account-updated'));
      setMessage('Your customer profile is saved. You’re ready to checkout.');
    }catch(error){
      setError(error instanceof Error?error.message:'Could not save profile.');
    }finally{
      setBusy(false);
    }
  }

  return <ShopShell>
    <div className="page-eyebrow">YOUR LITTLE CORNER OF MOBORA</div>
    <h1>Good to see you<span className="accent">.</span></h1>
    <p className="page-lead">Save your favourites. Make it personal. Follow every order.</p>
    {error&&<p className="form-error" role="alert">{error}</p>}
    {!data?<p>Loading your account…</p>:!data.user?<div className="account-grid">
      <section className="surface account-welcome">
        <div className="circle-icon"><UserRound/></div>
        <h2>Your phone. Your story.<br/>Your account.</h2>
        <p>Sign in securely, then add the email, name and mobile number where you want to receive MOBORA order updates.</p>
        <a className="primary" href="/signin-with-chatgpt?return_to=%2Faccount" target="_top">Sign in / register <ArrowUpRight size={18}/></a>
        <small>Use your existing account or create one on the sign-in screen.</small>
      </section>
      <section className="account-benefits">
        <Package/><h3>Every order, in one place</h3><p>See payment, printing and dispatch updates.</p>
        <Heart/><h3>A wishlist worth keeping</h3><p>Save designs now and come back when inspiration strikes.</p>
      </section>
    </div>:<div className="account-grid">
      <form className="surface commerce-form" onSubmit={save}>
        <p className="page-eyebrow">{data.profile?'YOUR PROFILE':'COMPLETE YOUR REGISTRATION'}</p>
        <h2>{data.profile?'Make yourself at home.':'Let’s make it official.'}</h2>
        <label>Customer email<input name="email" type="email" defaultValue={data.profile?.email||''} autoComplete="email" required placeholder="you@example.com"/></label>
        <p className="small-note">We use this email for your order and delivery updates.</p>
        <label>Your name<input name="name" defaultValue={data.profile?.name||''} minLength={2} maxLength={100} autoComplete="name" required placeholder="Your full name"/></label>
        <label>Mobile number<span className="input-prefix">+91<input name="phone" defaultValue={data.profile?.phone||''} pattern="[6-9][0-9]{9}" inputMode="tel" maxLength={10} autoComplete="tel-national" required placeholder="10-digit mobile number"/></span></label>
        <p className="small-note">Signing out clears this device’s saved profile and wishlist. Completed order records stay available to MOBORA for fulfilment. <Link href="/privacy">Privacy details</Link>.</p>
        <button disabled={busy} className="primary">{busy?'Saving…':data.profile?'Save profile':'Register & continue'}</button>
        {message&&<p className="success-note" role="status">{message}</p>}
      </form>
      <div className="account-shortcuts">
        <Link className="surface" href="/orders"><Package/><span><b>My orders</b><small>Follow your latest creation</small></span><ArrowUpRight/></Link>
        <Link className="surface" href="/wishlist"><Heart/><span><b>My wishlist</b><small>All your favourites, together</small></span><ArrowUpRight/></Link>
        <Link className="surface" href="/checkout"><Package/><span><b>Continue to checkout</b><small>Ready when you are</small></span><ArrowUpRight/></Link>
        {data.user.admin&&<Link className="surface" href="/admin"><ShieldCheck/><span><b>Admin dashboard</b><small>Orders, customers & enquiries</small></span><ArrowUpRight/></Link>}
        <SignOutButton className="signout-link"/>
      </div>
    </div>}
  </ShopShell>;
}
