import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import CepacLayout from "@/components/layout/CepacLayout";
import DynamicFavicon from "@/components/layout/DynamicFavicon";
import DynamicSEO from "@/components/layout/DynamicSEO";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "Projet 8e CEPAC Beni | Centre d'Etudes Primaires et Cycle Complémentaire",
  description:
    "Projet 8e CEPAC Beni - Centre d'Excellence en Education Primaire et Cycle Complémentaire au Bénin. Formation de qualité, programmes éducatifs innovants et développement intégral des apprenants.",
  icons: {
    icon: [], // Prevent Next.js from auto-generating favicon
    shortcut: [], // Prevent shortcut icon
    apple: [], // Prevent apple-touch-icon
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function CepacRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <DynamicFavicon />
        <DynamicSEO />
        <CepacLayout>{children}</CepacLayout>
      </body>
    </html>
  );
}
