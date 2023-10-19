import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pdf Uploader',
  description: 'Demo project made in NextJS for beautiful pdf converter',
  openGraph: {
    title: "MEHMET ALI IZCI",
    description: "I build things I have learned.",
    url: "",
    siteName: "",
    locale: "en-US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}
<Toaster />
</ThemeProvider>
</body>
    </html>
  )
}
