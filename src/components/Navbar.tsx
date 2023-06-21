import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import UserAccountNav from "./UserAccountNav";
import { buttonVariants } from "./ui/Button";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-neutral-100 border-b border-primary z-10 py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-end gap-2">
        {session?.user ? (
          <UserAccountNav user={session?.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
