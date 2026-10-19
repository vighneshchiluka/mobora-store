'use client';
import {useTheme} from 'next-themes';
import {Sun,Moon} from 'lucide-react';
export default function ThemeToggle(){const {resolvedTheme,setTheme}=useTheme();const dark=resolvedTheme!=='light';return <button type="button" className="theme-toggle" role="switch" aria-label="Dark theme" aria-checked={dark} title={'Switch to '+(dark?'light':'dark')+' theme'} onClick={()=>setTheme(dark?'light':'dark')}><span className="theme-toggle-thumb"/><Sun size={15} aria-hidden="true"/><Moon size={15} aria-hidden="true"/></button>}
