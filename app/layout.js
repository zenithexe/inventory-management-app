import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventory Management",
  description: "A Nextjs App for Inventory Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <NavBar />
          <div className="lg:mt-20">{children}</div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
