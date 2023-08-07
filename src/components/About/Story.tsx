import { Separator } from "../ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

const Story = () => {
  return (
    <div className="w-full px-4 lg:px-48 py-16">
      <h1 className="text-5xl font-bold text-center">
        A nossa <span className=" bg-secondary">História</span>
      </h1>
      <Tabs defaultValue="creation" className="py-16">
        <TabsList className="h-full grid lg:grid-cols-7 w-full gap-2 bg-transparent">
          <Separator className="bg-gray w-full h-px" />
          <TabsTrigger
            value="creation"
            className="font-bold text-2xl text-darkGray"
          >
            [ Creation ]
          </TabsTrigger>
          <Separator className="bg-gray w-full h-px" />
          <TabsTrigger
            value="growing"
            className="font-bold text-2xl text-darkGray"
          >
            [ Growing ]
          </TabsTrigger>
          <Separator className="bg-gray w-full h-px" />
          <TabsTrigger
            value="future"
            className="font-bold text-2xl text-darkGray"
          >
            [ Future ]
          </TabsTrigger>
          <Separator className="bg-gray w-full h-px" />
        </TabsList>
        <TabsContent
          value="creation"
          className="container py-8 text-darkGray text-xl px-4 lg:px-16"
        >
          <p>
            Founded in May 1983, Norasil – Sociedade de Construção Civil, SA,
            (with Headquarters and Central Shipyard in Matosinhos) has as its
            main object the execution of public and private works contracts.
          </p>
          <br />
          <p>
            The decision to create this construction company was a consequence
            of the natural evolution and aspiration of its Founder – Joaquim
            António Nogueira da Hora (Civil Engineer), today Chairman of the
            Board of Directors, who has always carried out his professional
            activity in construction companies.
          </p>
        </TabsContent>
        <TabsContent
          value="growing"
          className="container py-8 text-darkGray text-xl px-4 lg:px-16"
        >
          <p>
            Founded in May 1983, Norasil – Sociedade de Construção Civil, SA,
            (with Headquarters and Central Shipyard in Matosinhos) has as its
            main object the execution of public and private works contracts.
          </p>
          <br />
          <p>
            The decision to create this construction company was a consequence
            of the natural evolution and aspiration of its Founder – Joaquim
            António Nogueira da Hora (Civil Engineer), today Chairman of the
            Board of Directors, who has always carried out his professional
            activity in construction companies.
          </p>
        </TabsContent>
        <TabsContent
          value="future"
          className="container py-8 text-darkGray text-xl px-4 lg:px-16"
        >
          <p>
            Founded in May 1983, Norasil – Sociedade de Construção Civil, SA,
            (with Headquarters and Central Shipyard in Matosinhos) has as its
            main object the execution of public and private works contracts.
          </p>
          <br />
          <p>
            The decision to create this construction company was a consequence
            of the natural evolution and aspiration of its Founder – Joaquim
            António Nogueira da Hora (Civil Engineer), today Chairman of the
            Board of Directors, who has always carried out his professional
            activity in construction companies.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Story;
