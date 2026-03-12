import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import Navbar from '@/components/ui/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import { Poppins } from "next/font/google";

export const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
   title: 'Joel A. | Senior Process Technologist',
   description: 'Immersive portfolio of Joel A., Senior Process Technologist specializing in industrial bakery, food science, process optimization, and product innovation.',
   keywords: ['bakery', 'food science', 'process technologist', 'product development', 'industrial baking'],
   openGraph: {
      title: 'Joel A. | Senior Process Technologist',
      description: 'An immersive 3D portfolio experience for a Senior Process Technologist in the bakery industry.',
      type: 'website',
   },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" suppressHydrationWarning>
         <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
         </head>
         <body suppressHydrationWarning>
            {/* Film grain noise overlay */}
            <div className="noise" aria-hidden="true" />
            {/* Custom cursor */}
            <CustomCursor />
            {/* Smooth scroll provider */}
            <LenisProvider>
               <Navbar />
               <main>{children}</main>
            </LenisProvider>
         </body>
      </html>
   )
}
