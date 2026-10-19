import type {ComponentProps} from 'react';

// Use document navigation: Vinext's client router fails on the hosted build.
export default function SiteLink(props:ComponentProps<'a'>){return <a {...props}/>}
