import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Open_Sans } from "next/font/google";

export const metadata = {
  title: "Norasil",
  description:
    "Fundada em Maio de 1983, a Norasil – Sociedade de Construção Civil, S.A., (com Sede e Estaleiro Central em Matosinhos) tem como objecto principal a execução de empreitadas de obras públicas e de obras particulares.",
  alternates: {
    languages: {
      pt: "/",
    },
  },
  openGraph: {
    siteName: "Norasil",
    description:
      "Fundada em Maio de 1983, a Norasil – Sociedade de Construção Civil, S.A., (com Sede e Estaleiro Central em Matosinhos) tem como objecto principal a execução de empreitadas de obras públicas e de obras particulares.",
    emails: ["norasil@norasil.pt"],
    title: "Norasil - Sociedade de Consturção Civil S.A.",
    url: "https://norasil.pt",
    phoneNumbers: ["(+351) 229 399 250"],
    images: ["/assets/images/wallpaper.webp"],
    type: "website",
    locale: "pt_PT",
  },
  metadataBase: new URL("https://norasil.pt"),
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
        "text-slate-900 antialiased light w-full h-full m-0",
        openSans.className
      )}
    >
      <body className="min-h-screen h-full w-full m-0 antialiased bg-white">
        <Providers>
          {children}
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
