import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Takeat App"
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export default function FoodiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full bg-takeat-attention-50 flex justify-center">
      <body className={`${poppins.className} w-full`}>
        {children}
      </body>
    </html>
  );
}
