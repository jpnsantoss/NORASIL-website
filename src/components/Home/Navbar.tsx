"use client";
import { cn } from "@/lib/utils";
import {
  Building,
  Cloud,
  CreditCard,
  DownloadCloud,
  Github,
  Home,
  ImageIcon,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Paperclip,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";
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

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full h-fit">
      <div className="flex justify-between items-center h-full py-12 px-4 lg:px-48">
        <Image
          src="/assets/images/logo.png"
          width="240"
          height="120"
          alt="Logo"
        />
        <ul className="xl:flex gap-4 text-xl font-bold text-black xl:text-white hidden">
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
                      : "xl:text-white text-black"
                  ),
                })
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/empresa"
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: cn(
                    "text-xl font-bold",
                    pathname == "/empresa"
                      ? "text-primary underline"
                      : "xl:text-white text-black"
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
                      : "xl:text-white text-black"
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
                      : "xl:text-white text-black"
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
                      : "xl:text-white text-black"
                  ),
                })
              )}
            >
              Contacto
            </Link>
          </li>
        </ul>
        <DropdownMenu>
          <DropdownMenuTrigger className="xl:hidden" asChild>
            <Button variant="ghost" size={"icon"} className="hover:bg-primary">
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
