import AboutHeader from "@/components/About/AboutHeader";
import QualityPolicy from "@/components/About/QualityPolicy";
import Sqa from "@/components/About/Sqa";
import Story from "@/components/About/Story";
import ValueOffer from "@/components/About/ValueOffer";
import Navbar from "@/components/Home/Navbar";

import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Navbar dark />
      <AboutHeader />
      <div className="w-full h-24 lg:h-64 shadow-inner relative my-16">
        <Image
          src="/assets/images/about_banner.png"
          alt="Banner"
          fill
          className="object-cover object-center"
        />
      </div>
      <Story />
      <QualityPolicy />
      <ValueOffer />
      <Sqa />
    </div>
  );
};

export default Page;
