import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../../components/website/layout/Header";
import Footer from "../../components/website/layout/Footer";
import FloatingButtons from "../../components/website/layout/FloatingButtons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Technova Exhibits",
  description: "Technova Exhibits is a leading exhibition company in India, offering a wide range of exhibitions and events for various industries.",
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background antialiased ${inter.className}`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingButtons />
      </body>
    </html>
  );
} 