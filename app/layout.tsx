import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({subsets: ['latin']});

export const metadata: Metadata = {
  title: "NDV Rankings",
  description: "Rankings für alle Dartspieler in Niedersachsen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
