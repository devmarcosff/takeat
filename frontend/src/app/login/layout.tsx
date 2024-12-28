import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Takeat App - Login",
  description: "Conecte sua conta ao Takeat App",
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
      </body>
    </html>
  );
}