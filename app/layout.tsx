import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./Providers";
import CartSync from "@/components/CartSync";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar"; // ✅ Import your client navbar
import TopBanner from "@/components/TopBanner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ClerkProvider>
      <CartSync />
        <html lang="en">
          <body className={inter.className}>
            <TopBanner />
            <div className="sticky top-0 z-50">
    <Navbar />
  </div>
            <main>{children}</main>
            <Toaster position="top-center" />
          </body>
        </html>
      </ClerkProvider>
    </ReduxProvider>
  );
}
