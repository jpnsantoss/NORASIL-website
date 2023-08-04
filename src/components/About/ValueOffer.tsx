import { HeartHandshake, Search, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "../ui/Button";

const ValueOffer = () => {
  return (
    <div className="py-16">
      <h1 className="text-4xl font-bold text-center">
        Proposta de <span className=" bg-secondary">Valor</span>
      </h1>
      <div className="container grid lg:grid-cols-3 gap-8 py-16">
        <div className="w-full flex items-center">
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <HeartHandshake className="w-10 h-10 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-3xl">Proximity and Flexibility</h1>
              <p className="text-darkGray text-lg">
                Establishing a close relationship with Customers and doing
                everything to earn their trust and preference.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full grid gap-8">
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <Search className="w-10 h-10 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-3xl">Rigor</h1>
              <p className="text-darkGray text-lg">
                The fulfillment of commitments, within a framework of
                professionalism and responsibility.
              </p>
            </div>
          </div>
          <div className="bg-black shadow-lg shadow-gray rounded-xl w-full space-y-4 p-8">
            <h2 className="text-white font-bold text-xl">
              Want to See these <br /> in Action?
            </h2>
            <Button className="font-bold">See our works</Button>
          </div>
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <Wrench className="w-10 h-10 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-3xl">Competence</h1>
              <p className="text-darkGray text-lg">
                The performance of individual functions respecting the
                principles of ethics, rigor, efficiency and integrity.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-3xl">SQA</h1>
              <p className="text-darkGray text-lg text-clip">
                The provision of a Excelent Service, complying with the Legal
                Specifications and the reduction of Carbon Neutrality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueOffer;
