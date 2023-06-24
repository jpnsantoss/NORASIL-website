import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Open_Sans } from "next/font/google";

export const metadata = {
  title: "Norasil",
  description:
    "Fundada em Maio de 1983, a Norasil – Sociedade de Construção Civil, S.A., (com Sede e Estaleiro Central em Matosinhos) tem como objecto principal a execução de empreitadas de obras públicas e de obras particulares.",
};

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        openSans.className
      )}
    >
      <body className="min-h-screen pt-12 bg-neutral-50 antialiased">
        <Providers>
          {/* @ts-expect-error server component */}
          <Navbar />
          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
