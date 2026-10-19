'use client';
import Link from '@/components/site-link';
import {Heart,ArrowUpRight} from 'lucide-react';
import {products} from '@/lib/catalog';
import {Phone} from './storefront';
import {useWishlist,HeartButton} from './wishlist';
import ShopShell from './shop-shell';
export default function WishlistPage(){const wish=useWishlist(),list=products.filter(p=>wish.ids.includes(p.id));return <ShopShell><p className="page-eyebrow">LOVE IT. SAVE IT. MAKE IT YOURS.</p><h1>Your wishlist<span className="accent">.</span></h1><p className="page-lead">A little collection of things that feel like you.</p>{wish.error&&<p role="alert">{wish.error}</p>}{!list.length?<div className="surface empty-state"><Heart size={38}/><h2>Your next favourite is waiting.</h2><p>Tap the heart on a design to save it here.</p><Link className="primary" href="/mobile-cover">Explore covers <ArrowUpRight size={17}/></Link></div>:<div className="wishlist-grid">{list.map(p=><article className="product" key={p.id}><div className={'product-art '+p.color}><Phone art={p.art} model="iPhone 15 Pro"/><HeartButton id={p.id}/></div><p className="product-kicker">{p.type}</p><h3>{p.name}</h3><div className="clean-product-bottom"><span>₹{p.price}</span><Link href={(p.type==='Accessories'?'/accessories':'/mobile-cover')+'?design='+p.id}>Make it yours <ArrowUpRight size={14}/></Link></div></article>)}</div>}<p className="small-note">Saved on this device. Sign in to keep your wishlist with your account.</p></ShopShell>}
