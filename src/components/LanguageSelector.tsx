import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const otherLocale = locale === "en" ? "pt" : "en";
  const pathname = usePathname();

  return (
    <Link
      href={pathname}
      className="text-gray font-bold text-xl"
      locale={otherLocale}
    >
      <span className={locale === "pt" ? "text-primary" : ""}>PT</span>|
      <span className={locale === "en" ? "text-primary" : ""}>EN</span>
    </Link>
  );
}
