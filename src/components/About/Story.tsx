import { Separator } from "../ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

const Story = () => {
  return (
    <div className="w-full px-4 lg:px-48 py-16">
      <h1 className="text-5xl font-bold text-center leading-[4.5rem]">
        A nossa <span className=" bg-secondary">História</span>
      </h1>
      <Tabs defaultValue="creation" className="pt-16">
        <TabsList className="h-full grid lg:grid-cols-7 w-full gap-2 bg-transparent">
          <Separator className="bg-gray w-full h-px" />
          <TabsTrigger
            value="creation"
            className="font-bold text-2xl bg-transparent data-[state=active]:bg-transparent"
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
            Fundada em maio de 1983, a Norasil – Sociedade de Construção Civil,
            S.A., teve origem como uma consequência natural da trajetória
            profissional do seu Fundador, Joaquim António Nogueira da Hora, um
            Engenheiro Civil com experiência em empresas de construção.
            <br />
            <br />A empresa começou a sua jornada ao lado da Firma Nogueira da
            Hora – Sociedade Imobiliária, Lda., fundada em março de 1983, ambas
            pertencendo a um grupo de empresas familiares. Desde o início, a
            Norasil concentrou-se em especializações na construção civil,
            expandindo-se em áreas específicas e acumulando recursos técnicos e
            humanos para realizar empreitadas de infraestruturas, engenharia e
            acabamentos.
          </p>
        </TabsContent>
        <TabsContent
          value="growing"
          className="container py-8 text-darkGray text-xl px-4 lg:px-16"
        >
          <p>
            Hoje em dia, a Norasil consolidou a sua posição no mercado de obras
            públicas e privadas. Através de um crescimento constante e
            estratégico, a empresa tornou-se uma figura de renome no setor da
            construção civil, com uma reputação sólida e uma clientela leal.
            <br />
            <br /> A empresa mantém uma relação de confiança não apenas com os
            clientes, mas também com bancos, fornecedores, subempreiteiros e
            colaboradores. A sua capacidade de execução anual de empreitadas
            atingiu mais de vinte milhões de euros, graças aos recursos humanos
            e equipamentos adquiridos ao longo dos anos. A abordagem proativa da
            Norasil em questões como qualidade, segurança e meio ambiente
            contribuiu para a sua certificação em Gestão de Qualidade e a sua
            implementação de medidas de segurança e sustentabilidade.
          </p>
        </TabsContent>
        <TabsContent
          value="future"
          className="container py-8 text-darkGray text-xl px-4 lg:px-16"
        >
          <p>
            Olhando para o futuro, a Norasil pretende fortalecer a sua posição
            no mercado, tanto a nível nacional como internacional. A empresa
            ambiciona expandir a sua presença geográfica e aumentar a sua
            vantagem competitiva através de parcerias estratégicas que
            impulsionem sinergias. O foco na qualidade e inovação permanecerá
            uma prioridade, enquanto a busca por uma maior satisfação dos
            colaboradores e o desenvolvimento tecnológico permitirão projetos
            mais rápidos e seguros.
            <br />
            <br />A empresa também planeia manter a sua atividade económica
            viável, analisando soluções técnicas e económicas com rigor. A
            proximidade com os clientes antigos e a valorização da formação
            contínua são pontos essenciais para a Norasil, que continuará a
            basear-se nos seus valores de compromisso, profissionalismo e
            responsabilidade. A procura pela excelência e melhoria contínua
            continuará a ser a base da estratégia da Norasil, permitindo-lhe
            enfrentar o futuro com confiança.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Story;
