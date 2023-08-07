import { MapPin, Pin } from "lucide-react";

const FindUs = () => {
  return (
    <div className="py-16">
      <h1 className="text-5xl font-bold text-center">
        <span className=" bg-secondary">Find Us</span>
      </h1>
      <div className="flex gap-4 w-full justify-center items-center py-8">
        <MapPin className="w-8 h-8 text-primary" />
        <h2 className="text-xl font-bold text-darkGray">
          Rua de Brito Capelo 598, Matosinhos
        </h2>
      </div>
      <div className="container px-64 h-[45vh]">
        <div className="w-full h-full  rounded-xl border-2 border-black overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.801885798823!2d-8.692842723158789!3d41.182488108678385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd246f3a62c83bcf%3A0xc2e63f0fbba88dd4!2sNorasil%20-%20Sociedade%20De%20Constru%C3%A7%C3%A3o%20Civil%2C%20S.A!5e0!3m2!1spt-PT!2spt!4v1691371351352!5m2!1spt-PT!2spt"
            width={"100%"}
            height={"100%"}
            style={{ border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
