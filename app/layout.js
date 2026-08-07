import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Sysuit Info Tech | Liquid Digital Solutions',
  description: 'Sysuit Info Tech builds POS & Billing Software, Corporate Websites, Meta/Google Ads and Review Generation systems. Futuristic technology, real business results.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
