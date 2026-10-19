import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:'https://mobora-custom-covers.sandygnat.chatgpt.site/sitemap.xml'}}
