import type {MetadataRoute} from 'next';
import {products} from '@/lib/catalog';
export default function sitemap():MetadataRoute.Sitemap{return ['','/mobile-cover','/accessories','/custom-phone-covers-mumbai','/privacy',...products.map(p=>'/products/'+p.id)].map(path=>({url:'https://mobora-custom-covers.sandygnat.chatgpt.site'+path,lastModified:new Date('2026-10-19'),changeFrequency:'weekly',priority:path?0.6:1}))}

