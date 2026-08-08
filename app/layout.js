import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'SYSUIT INFO TECH | Digital Business & Technology Solutions',
  description: 'SYSUIT INFO TECH delivers Health IT, software development, website design, web & mobile apps, POS billing software and digital marketing for businesses across the globe.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}