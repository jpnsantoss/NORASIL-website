import { MapPin } from "lucide-react";
import Link from "next/link";

const FindUs = () => {
  return (
    <div className="py-16">
      <h1 className="text-5xl font-bold text-center">
        <span className=" bg-secondary">Localização</span>
      </h1>
      <div className="grid lg:grid-cols-2 gap-16 py-16 container">
        <div>
          <div className="flex flex-col items-center gap-2 py-8">
            <div className="flex gap-4 items-center">
              <MapPin className="lg:w-8 lg:h-8 text-primary" />
              <h2 className="text-lg lg:text-xl font-bold text-darkGray">
                Sede
              </h2>
            </div>
            <a
              href="http://maps.apple.com/?q=Norasil+-+Sociedade+De+Construção+Civil,+S.A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-darkGray"
            >
              Rua de Brito Capelo 598, Matosinhos
            </a>
          </div>
          <div className="h-[45vh]">
            <div className="w-full h-full  rounded-xl border-2 border-darkGray shadow overflow-hidden">
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
        <div>
          <div className="flex flex-col items-center gap-2 py-8">
            <div className="flex gap-4 items-center">
              <MapPin className="lg:w-8 lg:h-8 text-primary" />
              <h2 className="text-lg lg:text-xl font-bold text-darkGray">
                Estaleiro Central
              </h2>
            </div>
            <a
              href="http://maps.apple.com/?q=Rua+das+Rosas+519,+4455-550+Perafita"
              target="_blank"
              rel="noopener noreferrer"
              className="text-darkGray"
            >
              Rua das Rosas, 519 4455-550 Perafita
            </a>
          </div>
          <div className="h-[45vh]">
            <div className="w-full h-full  rounded-xl border-2 border-darkGray shadow overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.577243621956!2d-8.707255423157203!3d41.23098240568095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24690019eca6f3%3A0xeb140053331858bd!2sR.%20das%20Rosas%20519%2C%204455-550%20Perafita!5e0!3m2!1spt-PT!2spt!4v1698163227374!5m2!1spt-PT!2spt"
                width={"100%"}
                height={"100%"}
                style={{ border: "0" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
