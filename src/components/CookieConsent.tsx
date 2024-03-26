"use client";
import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/Button";

const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    if (storedCookieConsent === null) {
      setCookieConsent(null);
    } else {
      setCookieConsent(storedCookieConsent);
      handleCookie(storedCookieConsent);
    }
  }, []);

  const handleCookie = (value: boolean) => {
    const newValue = value ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setCookieConsent(value);

    setLocalStorage("cookie_consent", value);
  };

  return (
    <div
      className={cn(
        "z-50 m-4 left-0 bottom-0 max-w-[400px] shadow border bg-background border-lightGray rounded-xl p-4 space-y-2",
        cookieConsent != null ? "hidden" : "fixed"
      )}
    >
      <p className="text-sm">
        Este site utiliza cookies. Você pode optar por aceitar ou recusar o uso
        dessas tecnologias.
      </p>
      <div className="flex justify-end items-center gap-4">
        <Button
          onClick={() => handleCookie(false)}
          variant="ghost"
          className="px-0 text-sm"
        >
          Recusar
        </Button>
        <Button
          onClick={() => handleCookie(true)}
          className="bg-primary px-4 rounded-xl text-white font-semibold text-sm"
        >
          Aceitar tudo
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
