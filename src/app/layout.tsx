import type { Metadata } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CalmMind",
  description: "Tempat aman untuk menenangkan pikiran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} ${nunitoSans.variable} antialiased min-h-screen bg-neutral-bg text-text-main font-body`}
      >
        {children}
      </body>
    </html>
  );
}
