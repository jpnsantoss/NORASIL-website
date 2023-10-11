import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { SheetContent } from "./ui/Sheet";

const Contact = () => {
  return (
    <SheetContent>
      <div className="container flex flex-col gap-4 h-full items-center justify-center mx-auto p-4">
        <div className="my-4 overflow-hidden rounded-full">
          <Image
            src={"/assets/images/icon.svg"}
            alt="Norasil"
            width={120}
            height={120}
          />
        </div>
        <div className="text-center">
          <h1 className="font-bold font-title text-3xl uppercase">Norasil</h1>
          <h2 className="font-medium font-title">
            Soc. de Construção Civil, S.A.
          </h2>
        </div>
        <div className="py-8 space-y-16">
          <div className="flex items-center text-center flex-col gap-2">
            <Phone />
            <div>
              <h2 className="text-lg font-semibold">Telefone (Sede)</h2>
              <p className="text-sm">(+351) 229 399 250</p>
            </div>
          </div>
          <div className="flex items-center text-center flex-col gap-2">
            <Mail />
            <div>
              <h2 className="text-lg font-semibold">Endereço de E-Mail</h2>
              <p className="text-sm">(+351) 229 399 250</p>
            </div>
          </div>
          <div className="flex items-center text-center flex-col gap-2">
            <MapPin />
            <div>
              <h2 className="text-lg font-semibold">Localização (Sede)</h2>
              <p className="text-sm">Rua de Brito Capelo 598, Matosinhos</p>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
};

export default Contact;
