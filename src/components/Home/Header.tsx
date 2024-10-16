import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import Link from "next/link";
import Navbar from "../Navbar";
import { buttonVariants } from "../ui/Button";
import { Separator } from "../ui/Separator";

const inter = Inter({ subsets: ["latin"] });
const Header = async () => {
  const counter = await db.counter.findFirst();
  const t = await getTranslations("HomePage.Header");
  return (
    <div className="w-full h-full lg:min-h-[900px] min-h-[700px] overflow-hidden">
      <div className="w-full absolute left-0 top-0 z-20">
        <div className="relative w-full">
          <Navbar />
          <div className="lg:py-16 px-4 container ">
            <div className="flex flex-col gap-4">
              <h1
                className={cn(
                  inter.className,
                  "text-5xl lg:text-7xl font-extrabold leading-[4rem] lg:leading-[5rem]",
                )}
                dangerouslySetInnerHTML={{ __html: t.raw("title") }}
              />
              <p className="max-w-2xl text-lg lg:text-2xl font-bold spacing text-darkGray tracking-wide">
                {t("subtitle")}
              </p>
              <div>
                <Link
                  href={"/portfolio"}
                  className={cn(buttonVariants({ size: "lg" }), "my-4")}
                >
                  {t("button")}
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full flex 2xl:justify-center container px-4">
            <div className="flex justify-center items-center border border-darkGray rounded-xl overflow-hidden 2xl:ml-[20%] w-full lg:w-1/2 2xl:w-2/5 my-4">
              <div className="bg-black w-full text-center flex items-center justify-center text-lightGray flex-col gap-2 py-4">
                <span className="font-bold text-4xl text-primary">
                  {counter?.finishedBuilds}
                </span>
                {t("finishedBuilds")}
              </div>
              <div className="bg-white text-center flex w-full items-center justify-center text-darkGray flex-col gap-2 py-4">
                <span className="font-bold text-4xl text-black">
                  {counter?.constructionBuilds}
                </span>
                {t("constructionBuilds")}
              </div>
              <div className="bg-white h-full flex items-center">
                <Separator orientation="vertical" className="bg-gray h-2/3" />
              </div>
              <div className="bg-white flex text-center w-full items-center justify-center text-darkGray flex-col gap-2 py-4">
                <span className="font-bold text-4xl text-black">
                  {counter?.awards}
                </span>
                {t("awards")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden 2xl:block ml-[40%] before:-ml-[70%] w-[60%] h-full relative before:absolute before:w-full before:h-full before:bg-white before:top-0 before:-left-[10%] before:transform before:skew-x-12 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/images/background.webp')",
        }}
      ></div>
    </div>
  );
};

export default Header;
