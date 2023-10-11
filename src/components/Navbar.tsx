"use client";
import { cn } from "@/lib/utils";
import {
  Building,
  FileSearch,
  Home,
  ImageIcon,
  Menu,
  Paperclip,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

import { FC } from "react";
import Contact from "./Contact";
import { Sheet, SheetTrigger } from "./ui/Sheet";

interface NavbarProps {
  dark?: boolean;
}

const Navbar: FC<NavbarProps> = ({ dark }) => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center py-16 px-4 container">
      <Link href={"/"}>
        <Image
          src="/assets/images/Logo.svg"
          width="280"
          height="66"
          alt="Logo"
        />
      </Link>
      <ul className="2xl:flex gap-6 items-center text-xl font-bold text-darkGray 2xl:text-white hidden">
        <li>
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
                className: cn(
                  "text-xl font-bold",
                  pathname == "/"
                    ? "text-primary underline"
                    : dark
                    ? "text-darkGray"
                    : "2xl:text-white text-darkGray"
                ),
              })
            )}
          >
            Início
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
                className: cn(
                  "text-xl font-bold",
                  pathname == "/about"
                    ? "text-primary underline"
                    : dark
                    ? "text-darkGray"
                    : "2xl:text-white text-darkGray"
                ),
              })
            )}
          >
            Empresa
          </Link>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                size="sm"
                className={cn(
                  "text-xl font-bold focus:ring-0",
                  dark ? "text-darkGray" : "2xl:text-white text-darkGray"
                )}
              >
                Documentos
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Pdf Documents</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link
                href="/assets/documents/AlvaraDeConstrucao.pdf"
                locale={false}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Alvará de Construção</span>
                </DropdownMenuItem>
              </Link>
              <Link
                href="/assets/documents/RelatorioDeContas.pdf"
                locale={false}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  <FileSearch className="mr-2 h-4 w-4" />
                  <span>Relatório de Contas</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
                className: cn(
                  "text-xl font-bold",
                  pathname == "/portfolio"
                    ? "text-primary underline"
                    : dark
                    ? "text-darkGray"
                    : "2xl:text-white text-darkGray"
                ),
              })
            )}
          >
            Portfólio
          </Link>
        </li>
        <li>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={"link"}
                size={"sm"}
                className={cn(
                  { "border-black": dark },
                  "text-xl font-bold border-2 p-5",
                  pathname == "/contacto"
                    ? "text-primary underline"
                    : dark
                    ? "text-darkGray"
                    : "2xl:text-white text-darkGray"
                )}
              >
                Contacto
              </Button>
            </SheetTrigger>
            <Contact />
          </Sheet>
        </li>
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger className="2xl:hidden" asChild>
          <Menu className="w-10 h-10 hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Onde queres ir?</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/" className="flex gap-2 items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Início</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/about"} className="flex gap-2 items-center">
                <Building className="mr-2 h-4 w-4" />
                <span>Empresa</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:cursor-pointer">
                <Paperclip className="mr-2 h-4 w-4" />
                <span>Documentos</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <Link
                    href="/assets/documents/AlvaraDeConstrucao.pdf"
                    locale={false}
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <span>Alvará de Construção</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href="/assets/documents/RelatorioDeContas.pdf"
                    locale={false}
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <span>Relatório de Contas</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Link href={"/portfolio"} className="flex gap-2 items-center">
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>Portfólio</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
