import { Award, Circle, HardHat, Leaf } from "lucide-react";

const Sqa = () => {
  return (
    <div className="py-16">
      <h1 className="text-4xl font-bold text-center">
        <span className=" bg-secondary">Segurança, Qualidade e Ambiente</span>
      </h1>
      <div className="container py-16 space-y-16 relative">
        <div>
          <div className="flex gap-2 items-center text-4xl font-bold">
            <h1>Safety</h1>
            <HardHat className="w-12 h-12 text-primary" />
          </div>
          <p className="text-2xl text-darkGray ml-8 my-4">
            One of our priority objectives is the implementation of prevention
            and protection measures aimed at avoiding risks and ensuring the
            safety and health of workers.
          </p>
        </div>
        <div className="lg:ml-16">
          <div className="flex gap-2 items-center text-4xl font-bold">
            <h1>Environment</h1>
            <Leaf className="w-12 h-12 text-primary" />
          </div>
          <p className="text-2xl text-darkGray ml-8 my-4">
            Due to the importance we attach to it, we have long developed, on a
            case-by-case basis, an environmental management plan with the
            concrete objective of minimizing negative and harmful effects on the
            environment.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center text-4xl font-bold">
            <h1>Quality</h1>
            <Award className="w-12 h-12 text-primary" />
          </div>
          <p className="text-2xl text-darkGray ml-8 my-4">
            In 2001, NORASIL obtained the Quality Management System
            certification according to NP EN ISO 9001. In this context, a set of
            procedures, normalization, parameterization and periodic performance
            evaluation is naturally institutionalized, which are guarantees of a
            careful construction, with quality and security. It was later
            certified in accordance with NP EN ISO 9001:2000 and then by NP EN
            ISO 9001:2008.
          </p>
        </div>

        <Circle className="h-[600px] w-[600px] hidder lg:block text-primary absolute top-0 -left-[600px]" />
      </div>
    </div>
  );
};

export default Sqa;
