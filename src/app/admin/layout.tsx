import "@/styles/globals.css";

export const metadata = {
  title: "Norasil",
  description:
    "Fundada em Maio de 1983, a Norasil – Sociedade de Construção Civil, S.A., (com Sede e Estaleiro Central em Matosinhos) tem como objecto principal a execução de empreitadas de obras públicas e de obras particulares.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-7xl mx-auto h-full py-12">{children}</div>
  );
}
