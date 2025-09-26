import type { Metadata } from "next";
import "../globals.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const raleway = localFont({
  src: "../fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Ghost Store",
  description: "An e-commerce store built with Next.js ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={raleway.variable}>
        <body className={`${raleway.className} antialiased`}>
          <Header />
          {children}
          <Footer />
          <Toaster 
            position="top-center"  //centrer le toast
            richColors             //les couleurs par defaut
            duration={2000}         //durée d'affichage
            closeButton             //boutton de fermeture
          />
        </body>
      </html>
    </ClerkProvider>
  );
}