import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Menu from "@/components/menu/menu.component";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Takeat App",
  description: "Faça seus pedidos com o Takeat App",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full bg-takeat-attention-50">
      <body
        className={`${poppins.className} h-full`}
      >
        {children}
        <Menu />
        <ToastContainer />
      </body>
    </html>
  );
}