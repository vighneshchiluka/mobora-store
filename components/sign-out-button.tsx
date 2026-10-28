'use client';

import {useState} from 'react';
import {LogOut} from 'lucide-react';

type Props={className?:string;children?:React.ReactNode;onComplete?:()=>void};

export default function SignOutButton({className='',children,onComplete}:Props){
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');

  async function signOut(){
    if(busy)return;
    setBusy(true);
    setError('');
    try{
      const response=await fetch('/api/account',{method:'DELETE'});
      if(!response.ok)throw new Error('Could not clear the saved account details.');
      for(const key of ['mobora-bag','mobora-wishlist'])localStorage.removeItem(key);
      window.dispatchEvent(new Event('mobora-wishlist'));
      window.dispatchEvent(new Event('mobora-account-updated'));
      onComplete?.();
      window.location.assign('/signout-with-chatgpt?return_to=%2Faccount');
    }catch(e){
      setError(e instanceof Error?e.message:'Could not sign out. Please try again.');
      setBusy(false);
    }
  }

  return <><button type="button" className={className} onClick={()=>void signOut()} disabled={busy}>{children??<><LogOut size={16}/> {busy?'Signing out…':'Sign out'}</>}</button>{error&&<span className="signout-error" role="alert">{error}</span>}</>;
}
