import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import '../styles/globals.css'

const montserrat = Montserrat({subsets: ['latin']});

export const metadata: Metadata = {
  title: "NDV Rankings - Match Planer",
  description: "Plane dein Match und schaue wer gewinnt!",
};
// Think about nested routing that replaces the player list with a detailed component
export default function PlannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-theme="acid">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
