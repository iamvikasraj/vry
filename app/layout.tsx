import type { Metadata } from 'next'
import Script from 'next/script'
import GA4PageView from '@/components/GA4PageView'
import '../styles.css'

export const metadata: Metadata = {
  title: 'Vikas Raj Yadav | Staff Product Designer & Technologist | UI/UX Designer | Motion Design Expert | Bengaluru',
  description: 'Staff Product Designer & Technologist @ Loop Health (YC 20) ✦ 10+ years of experience ✦ Rive & Play Ambassador ✦ Previously at Paytm, HDFC, Times, Grappus',
  keywords: 'Vikas Raj Yadav, Product Designer, UI/UX Designer, Motion Design, Interaction Design, FinTech Design, Design Engineer in India, Design Technologist in India, Staff Design Technologist in India, Design Engineer, Design Technologist, Staff Design Technologist, Design Engineer Bengaluru, Design Technologist Bengaluru, Staff Design Technologist Bengaluru, Product Designer Bengaluru, UI/UX Designer Bengaluru',
  authors: [{ name: 'Vikas Raj Yadav' }],
  openGraph: {
    type: 'profile',
    url: 'https://vikasrajyadav.in/',
    title: 'Vikas Raj Yadav | Staff Product Designer & Technologist | UI/UX Designer | Motion Design Expert',
    description: 'Staff Product Designer & Technologist @ Loop Health (YC 20) ✦ 10+ years of experience ✦ Rive & Play Ambassador ✦ Previously at Paytm, HDFC, Times, Grappus',
    images: ['https://vikasrajyadav.in/assets/images/vry.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vraj247',
    creator: '@vraj247',
    title: 'Vikas Raj Yadav | Staff Product Designer & Technologist | UI/UX Designer | Motion Design Expert',
    description: 'Staff Product Designer & Technologist @ Loop Health (YC 20) ✦ 10+ years of experience ✦ Rive & Play Ambassador ✦ Previously at Paytm, HDFC, Times, Grappus',
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
        
        {/* Additional Meta for AI Search Engines */}
        <meta name="author" content="Vikas Raj Yadav" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <meta name="language" content="English" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/wjs0dtk.css" />
        
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        
        {/* Structured Data for AI Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Vikas Raj Yadav",
              "alternateName": "vry",
              "jobTitle": "Staff Product Designer & Technologist",
              "description": "Staff Product Designer & Technologist @ Loop Health (YC 20) with 10+ years of experience. Rive & Play Ambassador. Previously at Paytm, HDFC Bank, Times, Grappus. Specializes in UI/UX design, motion design, interaction design, and design engineering.",
              "url": "https://vikasrajyadav.in",
              "image": "https://vikasrajyadav.in/assets/images/vry.jpg",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bengaluru",
                "addressRegion": "Karnataka",
                "addressCountry": "IN"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Loop Health",
                "description": "YC 20 startup",
                "url": "https://loophealth.com"
              },
              "alumniOf": [
                {
                  "@type": "Organization",
                  "name": "Paytm"
                },
                {
                  "@type": "Organization",
                  "name": "HDFC Bank"
                },
                {
                  "@type": "Organization",
                  "name": "Times"
                },
                {
                  "@type": "Organization",
                  "name": "Grappus"
                }
              ],
              "sameAs": [
                "https://x.com/vryworks",
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
                "Product Design",
                "Design Engineering",
                "Design Technology",
                "Prototyping",
                "Figma",
                "Play (prototyping tool)",
                "FinTech Design",
                "Banking UX",
                "Mobile App Design",
                "Web Design"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Staff Product Designer & Technologist",
                "occupationLocation": {
                  "@type": "City",
                  "name": "Bengaluru"
                },
                "skills": [
                  "Product Design",
                  "UI/UX Design",
                  "Motion Design",
                  "SwiftUI Development",
                  "Rive Animation",
                  "Prototyping",
                  "Design Systems",
                  "Interaction Design"
                ]
              },
              "award": "Rive & Play Ambassador",
              "jobLocation": {
                "@type": "City",
                "name": "Bengaluru",
                "addressRegion": "Karnataka",
                "addressCountry": "IN"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Vikas Raj Yadav - Portfolio",
              "url": "https://vikasrajyadav.in",
              "description": "Portfolio of Vikas Raj Yadav - Staff Product Designer & Technologist at Loop Health. 10+ years of experience in UI/UX design, motion design, and design engineering. Rive & Play Ambassador.",
              "author": {
                "@type": "Person",
                "name": "Vikas Raj Yadav"
              },
              "inLanguage": "en",
              "keywords": "Product Designer, UI/UX Designer, Design Engineer, Design Technologist, Motion Design, SwiftUI, Rive, Bengaluru, India"
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "name": "Vikas Raj Yadav",
                "jobTitle": "Staff Product Designer & Technologist",
                "worksFor": "Loop Health (YC 20)",
                "description": "Staff Product Designer & Technologist with 10+ years of experience. Rive & Play Ambassador from India. Previously worked at Paytm, HDFC Bank, Times, and Grappus. Based in Bengaluru, India.",
                "knowsAbout": [
                  "Product Design",
                  "UI/UX Design",
                  "Design Engineering",
                  "Design Technology",
                  "Motion Design",
                  "Interaction Design",
                  "SwiftUI",
                  "Rive Animation",
                  "Prototyping",
                  "FinTech Design"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Bengaluru",
                  "addressRegion": "Karnataka",
                  "addressCountry": "IN"
                }
              }
            }),
          }}
        />
      </head>
      <body>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SYDGLK4LKX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SYDGLK4LKX', {
                send_page_view: true
              });
              
              // Verify GA4 is loaded
              setTimeout(function() {
                if (typeof window.gtag === 'function') {
                  console.log('✅ GA4 loaded successfully: G-SYDGLK4LKX');
                } else {
                  console.error('❌ GA4 failed to load');
                }
              }, 2000);
            `,
          }}
        />
        <GA4PageView />
        {children}
      </body>
    </html>
  )
}
