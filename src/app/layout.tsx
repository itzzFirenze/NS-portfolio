import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import Navbar from '@/components/ui/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import { Poppins, Caveat, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
});

export const caveat = Caveat({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   variable: "--font-caveat",
});

export const metadata: Metadata = {
   title: 'Nir Bahadur | Senior Process Technologist',
   description: 'Immersive portfolio of Nir Bahadur, Senior Process Technologist specializing in industrial bakery, food science, process optimization, and product innovation.',
   keywords: ['bakery', 'food science', 'process technologist', 'product development', 'industrial baking'],
   openGraph: {
      title: 'Nir Bahadur | Senior Process Technologist',
      description: 'An immersive 3D portfolio experience for a Senior Process Technologist in the bakery industry.',
      type: 'website',
   },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
         <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
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
