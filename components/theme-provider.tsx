'use client';
import {ThemeProvider as Provider} from 'next-themes';
export default function ThemeProvider({children}:{children:React.ReactNode}){return <Provider attribute="data-theme" defaultTheme="dark" enableSystem={false} storageKey="mobora-theme" disableTransitionOnChange>{children}</Provider>}
