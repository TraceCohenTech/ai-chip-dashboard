import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Silicon Wars | Private AI Chip Startup Universe",
  description:
    "43 US AI chip startups competing to dethrone Nvidia — $16B+ in funding, from datacenter ASICs to photonic interconnects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
        style={{ background: "#0A0A0F" }}
      >
        {children}
      </body>
    </html>
  );
}
