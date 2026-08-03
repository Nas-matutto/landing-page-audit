"use client"

import Script from 'next/script'

declare global {
  interface Window {
    // Injected by the pixel snippet below. Optional because it is undefined until
    // the script loads (and stays undefined if a blocker kills it) — always call
    // it as `window.fbq?.(...)`.
    fbq?: (
      command: 'track' | 'trackCustom' | 'init',
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void
  }
}

export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1897592074123781');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{display: 'none'}}
          src="https://www.facebook.com/tr?id=1897592074123781&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  )
}