'use client';

import {useEffect,useRef,useState} from 'react';
import {ChevronDown,UserRound} from 'lucide-react';
import Link from './site-link';
import SignOutButton from './sign-out-button';

type Account={user:null|{name:string;email:string;admin:boolean};profile?:null|{name:string}};

export default function HeaderAccount(){
  const [account,setAccount]=useState<Account|null>(null);
  const menu=useRef<HTMLDetailsElement>(null);

  useEffect(()=>{
    let active=true;
    const load=()=>{void fetch('/api/account',{cache:'no-store'}).then(response=>{if(!response.ok)throw Error();return response.json() as Promise<Account>}).then(data=>{if(active)setAccount(data)}).catch(()=>{})};
    const outside=(event:PointerEvent)=>{if(menu.current&&!menu.current.contains(event.target as Node))menu.current.open=false};
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'&&menu.current?.open){menu.current.open=false;menu.current.querySelector('summary')?.focus()}};
    load();
    window.addEventListener('focus',load);
    window.addEventListener('mobora-account-updated',load);
    document.addEventListener('pointerdown',outside);
    document.addEventListener('keydown',escape);
    return()=>{active=false;window.removeEventListener('focus',load);window.removeEventListener('mobora-account-updated',load);document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)};
  },[]);

  if(!account?.user)return <Link className="account-link" href="/account"><UserRound size={19}/><span>Sign in / register</span></Link>;

  const name=account.profile?.name?.trim()||account.user.name?.trim()||account.user.email.split('@')[0];
  return <details className="header-account" ref={menu}>
    <summary aria-label={'Account menu for '+name}><UserRound size={19}/><span className="header-username" title={name}>{name}</span><ChevronDown size={15}/></summary>
    <div className="header-account-dropdown">
      <span className="header-account-caption">Signed in as <b>{name}</b></span>
      <Link href="/account">My account</Link>
      <Link href="/orders">My orders</Link>
      <Link href="/wishlist">My wishlist</Link>
      {account.user.admin&&<Link href="/admin">Admin dashboard</Link>}
      <SignOutButton className="header-signout"/>
    </div>
  </details>;
}

