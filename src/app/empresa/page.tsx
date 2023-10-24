import AboutBanner from "@/components/About/AboutBanner";
import AboutHeader from "@/components/About/AboutHeader";
import QualityPolicy from "@/components/About/QualityPolicy";
import Sqa from "@/components/About/Sqa";
import Story from "@/components/About/Story";
import ValueOffer from "@/components/About/ValueOffer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Navbar dark />
      <AboutHeader />
      <AboutBanner />
      <Story />
      <QualityPolicy />
      <ValueOffer />
      <Sqa />
      <Footer />
    </div>
  );
};

export default Page;
