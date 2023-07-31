import AboutHeader from "@/components/About/AboutHeader";
import Navbar from "@/components/Home/Navbar";
import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Navbar dark />
      <AboutHeader />
      <div className="w-full h-64 relative my-16">
        <Image src="/assets/images/about_banner.png" alt="Banner" fill />
      </div>
    </div>
  );
};

export default Page;
