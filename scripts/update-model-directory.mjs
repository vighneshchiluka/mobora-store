import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const sourceUrl='https://zapvi.in/mobile-cover/';
const html=process.argv[2]?fs.readFileSync(process.argv[2],'utf8'):await (await fetch(sourceUrl)).text();
const clean=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&nbsp;/g,' ').trim();
const old={Apple:['iPhone 16','iPhone 16 Pro','iPhone 15','iPhone 15 Pro','iPhone 14','iPhone 13'],Samsung:['Galaxy S24','Galaxy S24 Ultra','Galaxy S23','Galaxy A55'],OnePlus:['OnePlus 12','OnePlus 12R','OnePlus Nord CE 4'],Vivo:['Vivo V30','Vivo V29'],Oppo:['Oppo Reno 11','Oppo F25 Pro'],Realme:['Realme 12 Pro','Realme Narzo 70']};
const fingerprint=s=>s.toLowerCase().replace(/\(5g\)/g,'').replace(/\s/g,'');
const directory={};
for(const match of html.matchAll(/<details\b[^>]*name="zv-brands"[^>]*>([\s\S]*?)<\/details>/g)){
 const content=match[1];const brand=clean(content.match(/<summary[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/)?.[1]||'');
 const links=[...content.matchAll(/<a\b[^>]*href="[^"]+"[^>]*>([\s\S]*?)<\/a>/g)];
 const models=links.map(m=>clean(m[1]).replace(/^Apple\s+Iphone\s*/i,'iPhone ').replace(/^Samsung\s+/i,'').replace(/^Oneplus/i,'OnePlus').replace(/^Iqoo/i,'iQOO').replace(/\bXr\b/g,'XR').replace(/\bXs\b/g,'XS').replace(/\bXl\b/g,'XL').replace(/\bSe\b/g,'SE').replace(/\bGt\b/g,'GT').replace(/\bCe\b/g,'CE'));
 directory[brand]=[...new Set(models.map(m=>(old[brand]||[]).find(o=>fingerprint(o)===fingerprint(m))||m))];
 for(const legacy of old[brand]||[])if(!directory[brand].includes(legacy))directory[brand].push(legacy);
}
// Historic OnePlus models absent from the reference cover directory, verified
// against the manufacturer's model pages. These are enquiry options, not stock.
directory.OnePlus=[...new Set(['OnePlus One','OnePlus 2','OnePlus X',...(directory.OnePlus||[])])];
const redmi=(directory.Xiaomi||[]).filter(m=>/^Xiaomi Redmi /i.test(m));
directory.Redmi=redmi.map(m=>m.replace(/^Xiaomi /i,''));
directory.Xiaomi=directory.Xiaomi.filter(m=>!/^Xiaomi Redmi /i.test(m));
const ordered=Object.fromEntries(Object.entries(directory).sort(([a],[b])=>a.localeCompare(b)));
if(Object.keys(directory).length<20||directory.OnePlus.length<50||Object.values(directory).flat().length<1000)throw Error('Unexpected or incomplete source directory; existing data preserved.');
fs.writeFileSync(path.join(root,'lib/phone-models.json'),JSON.stringify(ordered,null,2)+'\n');
fs.writeFileSync(path.join(root,'lib/phone-models.sources.json'),JSON.stringify({retrievedOn:'2026-10-19',sourceUrl,supplementarySources:['https://www.oneplus.com/global/one','https://www.oneplus.com/global/2','https://www.oneplus.com/global/x/specs'],note:'Public model names and case-fit variants. Directory inclusion does not confirm MOBORA stock or cover compatibility; confirm on enquiry.',brands:Object.keys(directory).length,modelOptions:Object.values(directory).flat().length},null,2)+'\n');
console.log(JSON.stringify({brands:Object.keys(directory).length,modelOptions:Object.values(directory).flat().length,OnePlus:directory.OnePlus.length}));

