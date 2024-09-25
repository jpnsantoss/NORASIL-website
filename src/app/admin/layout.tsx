import { getAuthSession } from "@/lib/auth";
import "@/styles/globals.css";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Norasil - Dashboard",
  description:
    "This is where you can manage Norasil website, by adding/editing/deliting posts, categories and users.",
  openGraph: {
    description:
      "This is where you can manage Norasil website, by adding/editing/deliting posts, categories and users.",
    emails: ["norasil@norasil.pt"],
    title: "Norasil",
    url: "https://norasil.pt",
    phoneNumbers: ["(+351) 229 399 250"],
    images: ["/assets/images/wallpaper.webp"],
  },
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
