import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'SYSUIT INFO TECH | Digital Business & Technology Solutions',
  description: 'SYSUIT INFO TECH delivers Health IT, software development, website design, web & mobile apps, POS billing software and digital marketing for businesses across the globe.',
  icons: {
    icon: 'https://www.image2url.com/r2/default/images/1786211606294-1e47c705-e869-4f1a-ad4b-2fc120a9a625.png',
    shortcut: 'https://www.image2url.com/r2/default/images/1786211606294-1e47c705-e869-4f1a-ad4b-2fc120a9a625.png',
    apple: 'https://www.image2url.com/r2/default/images/1786211606294-1e47c705-e869-4f1a-ad4b-2fc120a9a625.png',
  },
  openGraph: {
    title: 'SYSUIT INFO TECH | Digital Business & Technology Solutions',
    description: 'SYSUIT INFO TECH delivers Health IT, software development, website design, web & mobile apps, POS billing software and digital marketing for businesses across the globe.',
    images: [
      {
        url: 'https://www.image2url.com/r2/default/images/1786211606294-1e47c705-e869-4f1a-ad4b-2fc120a9a625.png',
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
    images: ['https://www.image2url.com/r2/default/images/1786211606294-1e47c705-e869-4f1a-ad4b-2fc120a9a625.png'],
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