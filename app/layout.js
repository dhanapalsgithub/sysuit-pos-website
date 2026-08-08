import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'SYSUIT INFO TECH | Digital Business & Technology Solutions',
  description: 'SYSUIT INFO TECH delivers Health IT, software development, website design, web & mobile apps, POS billing software and digital marketing for businesses across the globe.',
  openGraph: {
    title: 'SYSUIT INFO TECH | Digital Business & Technology Solutions',
    description: 'SYSUIT INFO TECH delivers Health IT, software development, website design, web & mobile apps, POS billing software and digital marketing for businesses across the globe.',
    images: [
      {
        url: 'https://i.ibb.co/Hf32KsJ9/Chat-GPT-Image-Aug-8-2026-10-04-09-AM.png',
        width: 1200,
        height: 630,
        alt: 'SYSUIT INFO TECH Preview Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYSUIT INFO TECH | Digital Business & Technology Solutions',
    description: 'SYSUIT INFO TECH delivers Health IT, software development, website design, web & mobile apps, POS billing software and digital marketing for businesses across the globe.',
    images: ['https://i.ibb.co/Hf32KsJ9/Chat-GPT-Image-Aug-8-2026-10-04-09-AM.png'],
  },
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