import type { Metadata } from 'next';
import './globals.css';
import './dark.css';
import './light.css';
import ThemeProvider from '@/components/theme-provider';
const origin='https://mobora-custom-covers.sandygnat.chatgpt.site';
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:'MOBORA | Customised Phone Covers & Mobile Accessories in Mumbai',template:'%s | MOBORA'},description:'Create a personalised phone cover with your photos and text. Explore custom mobile covers, phone grips and accessories with MOBORA, Mumbai.',alternates:{canonical:'/'},openGraph:{title:'MOBORA — Your phone. Your story.',description:'Personalised phone covers and everyday mobile accessories. Create your own with MOBORA, Mumbai.',url:origin,siteName:'MOBORA',locale:'en_IN',type:'website',images:[{url:'/social.svg',width:1200,height:630}]},twitter:{card:'summary_large_image'},icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-IN" suppressHydrationWarning><head><link rel="preload" href="/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><ThemeProvider>{children}</ThemeProvider><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'MOBORA',url:origin,description:'Personalised phone covers and mobile accessories for Mumbai.',areaServed:{'@type':'City',name:'Mumbai'}})}}/></body></html>}

