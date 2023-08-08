"use client";
import { cn } from "@/lib/utils";
import {
  Building,
  Home,
  ImageIcon,
  LogOut,
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
  DropdownMenuShortcut,
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
    <div className="flex justify-between items-center py-16 px-4 lg:px-48">
      <Image src="/assets/images/logo.png" width="300" height="66" alt="Logo" />
      <ul className="2xl:flex gap-8 items-center text-xl font-bold text-darkGray 2xl:text-white hidden">
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
            Home
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
          <Link
            href="/documentos"
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
                className: cn(
                  "text-xl font-bold",
                  pathname == "/documentos"
                    ? "text-primary underline"
                    : dark
                    ? "text-darkGray"
                    : "2xl:text-white text-darkGray"
                ),
              })
            )}
          >
            Documentos
          </Link>
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
          <Button variant="ghost" size={"xs"} className="hover:bg-primary">
            <Menu className="w-8 h-8" />
          </Button>
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
              <DropdownMenuSubTrigger>
                <Paperclip className="mr-2 h-4 w-4" />
                <span>Documentos</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Alvará de Construção</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Relatório de Contas</span>
                  </DropdownMenuItem>
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
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
