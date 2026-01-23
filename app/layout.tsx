import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles.css'

export const metadata: Metadata = {
  title: 'Vikas Raj Yadav | Design Director | UI/UX Designer | Motion Design Expert | Bengaluru',
  description: 'Vikas Raj Yadav is a Design Director and UI/UX expert based in Bengaluru, specializing in FinTech design, motion systems, and interaction design.',
  keywords: 'Vikas Raj Yadav, Design Director, UI/UX Designer, Motion Design, Interaction Design, FinTech Design',
  authors: [{ name: 'Vikas Raj Yadav' }],
  openGraph: {
    type: 'profile',
    url: 'https://vikasrajyadav.in/',
    title: 'Vikas Raj Yadav | Design Director | UI/UX Designer | Motion Design Expert',
    description: 'Design Director and UI/UX expert based in Bengaluru, specializing in FinTech design, motion systems, and interaction design.',
    images: ['https://vikasrajyadav.in/assets/images/vry.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vraj247',
    creator: '@vraj247',
    title: 'Vikas Raj Yadav | Design Director | UI/UX Designer | Motion Design Expert',
    description: 'Design Director and UI/UX expert based in Bengaluru, specializing in FinTech design, motion systems, and interaction design.',
    images: ['https://vikasrajyadav.in/assets/images/vry.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon/favicon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicon/favicon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/favicon-512x512.png" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <link rel="robots" href="/robots.txt" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://vikasrajyadav.in/" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Vikas Raj Yadav",
              "jobTitle": "Design Director",
              "url": "https://vikasrajyadav.in",
              "sameAs": [
                "https://twitter.com/vraj247",
                "https://linkedin.com/in/vraj247",
                "https://dribbble.com/Vraj247",
                "https://www.behance.net/Vraj247"
              ],
              "knowsAbout": [
                "UI/UX Design",
                "Motion Design",
                "Interaction Design",
                "SwiftUI",
                "Three.js",
                "Rive Animation",
                "Product Design"
              ]
            }),
          }}
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-21N5FSST5Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-21N5FSST5Y');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
