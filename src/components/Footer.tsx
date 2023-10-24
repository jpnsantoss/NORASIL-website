"use client";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Linkedin, MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";

const Footer = () => {
  return (
    <div className="mt-32 bg-black relative">
      <div className="w-full grid lg:grid-cols-9">
        <div className="lg:mx-auto col-span-2 space-y-4 py-8 px-8 lg:py-16 lg:pl-16">
          <Image
            src="/assets/images/LogoLight.svg"
            alt="Logo"
            width={240}
            height={56}
          />
          <p className="text-gray font-bold">
            Com experiência no mercado, <br /> investimos em inovação <br />
            para garantir construções <br /> seguras, duráveis e únicas.
          </p>
        </div>
        <div className=" space-y-4 col-span-2 lg:mx-auto py-8 px-8 lg:py-16">
          <h1 className="uppercase text-2xl text-white font-bold">
            Links Úteis
          </h1>
          <ul>
            <li>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 text-gray font-bold"
                )}
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 text-gray font-bold"
                )}
              >
                Empresa
              </Link>
            </li>

            <li>
              <Link
                href="/portfolio"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 text-gray font-bold"
                )}
              >
                Portfólio
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:mx-auto space-y-4 col-span-2 py-8 px-8 lg:py-16">
          <h1 className="uppercase text-2xl text-white font-bold">
            Informações
          </h1>
          <ul>
            <li>
              <Link
                href="/privacidade"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 text-gray font-bold"
                )}
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link
                href="https://norasil.portaldedenuncias.pt/"
                target="_blank"
                referrerPolicy="no-referrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 text-gray font-bold"
                )}
              >
                Canal de Denúncias
              </Link>
            </li>

            <li>
              <Link
                href="https://www.livroreclamacoes.pt/Inicio/"
                target="_blank"
                referrerPolicy="no-referrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 text-gray font-bold"
                )}
              >
                Livro de Reclamações
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full h-full relative col-span-3">
          <div className="lg:absolute w-full h-full -top-24 bg-white rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none shadow-[-2px_-2px_10px_0px_rgba(0,0,0,0.25)] p-8">
            <div className="flex gap-4 h-full">
              <MessagesSquare className="w-10 h-10 text-primary" />
              <div className="flex flex-col justify-between h-full gap-4">
                <h1 className="text-3xl font-bold uppercase ">Contacte-nos</h1>
                <ul className="font-bold text-lg space-y-4">
                  <li>Rua de Brito Capelo 598, Matosinhos</li>
                  <li>norasil@norasil.pt</li>
                  <li>(+351) 229 399 250</li>
                </ul>
                <div className="flex gap-8">
                  <a
                    href="https://www.instagram.com/norasil1983/"
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    <Instagram className="w-8 h-8 text-primary hover:scale-110 duration-300 transition ease-in-out" />
                  </a>
                  <a
                    href="https://www.facebook.com/norasil.pt/"
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    <Facebook className="w-8 h-8 text-primary hover:scale-110 duration-300 transition ease-in-out" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/norasil"
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    <Linkedin className="w-8 h-8 text-primary hover:scale-110 duration-300 transition ease-in-out" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
