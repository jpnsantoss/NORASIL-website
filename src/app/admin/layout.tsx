import { getAuthSession } from "@/lib/auth";
import "@/styles/globals.css";
import { redirect, useRouter } from "next/navigation";

export const metadata = {
  title: "Norasil",
  description:
    "Fundada em Maio de 1983, a Norasil – Sociedade de Construção Civil, S.A., (com Sede e Estaleiro Central em Matosinhos) tem como objecto principal a execução de empreitadas de obras públicas e de obras particulares.",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  if (!session) return redirect("/sign-in");
  return <div className="container py-12">{children}</div>;
}
