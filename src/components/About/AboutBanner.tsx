"use client";

import Image from "next/image";

const AboutBanner = () => {
  return (
    <div className="w-full h-[15vh] lg:h-[25vh] shadow-inner bg-primary/10 relative my-16">
      <Image
        src="/assets/images/about_banner.webp"
        alt="Banner"
        fill
        loading="lazy"
        className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
        onLoad={(event) => {
          const image = event.target as HTMLImageElement;
          image.classList.remove("opacity-0");
        }}
      />
    </div>
  );
};

export default AboutBanner;
