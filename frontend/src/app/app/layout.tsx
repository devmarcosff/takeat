import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Takeat App",
  description: "Faça seus pedidos com o Takeat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full bg-takeat-attention-50">
      <body>
        {children}
      </body>
    </html>
  );
}
