'use client';
import {useEffect,useState} from 'react';
import {coverTextSize,coverTextColour} from '@/lib/cover-text';
export default function CoverText({text,background,photo=false}:{text:string;background?:string;photo?:boolean}){
 const [size,setSize]=useState(100);
 useEffect(()=>{const context=document.createElement('canvas').getContext('2d');if(context)setSize(coverTextSize(context,text))},[text]);
 return <svg className="fitted-cover-text" viewBox="0 0 1200 2400" aria-label={text}><text x="600" y="1500" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic" fontSize={size} fill={photo?'#fff9ef':coverTextColour(background||'#e6c9cf')}>{text}</text></svg>;
}
