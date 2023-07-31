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
import { Button, buttonVariants } from "../ui/Button";
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
} from "../ui/DropdownMenu";

import { FC } from "react";

interface NavbarProps {
  dark?: boolean;
}

const Navbar: FC<NavbarProps> = ({ dark }) => {
  const pathname = usePathname();
  return (
    <div className="w-full h-fit">
      <div className="flex justify-between items-center h-full py-16 px-4 lg:px-48">
        <Image
          src="/assets/images/logo.png"
          width="240"
          height="120"
          alt="Logo"
        />
        <ul className="2xl:flex gap-4 text-xl font-bold text-darkGray 2xl:text-white hidden">
          <li>
            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: "link",
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
            <Link
              href="/contacto"
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: cn(
                    "text-xl font-bold",
                    pathname == "/contacto"
                      ? "text-primary underline"
                      : dark
                      ? "text-darkGray"
                      : "2xl:text-white text-darkGray"
                  ),
                })
              )}
            >
              Contacto
            </Link>
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
                <Home className="mr-2 h-4 w-4" />
                <span>Início</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                <span>Empresa</span>
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
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>Portfólio</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
