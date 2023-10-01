import { Circle, Eye, Lightbulb, PieChart, Target } from "lucide-react";

const QualityPolicy = () => {
  return (
    <div className="py-32 my-16 bg-black relative overflow-hidden">
      <h1 className="text-5xl font-bold text-center text-white leading-[4.5rem]">
        Política de <span className=" bg-primary">Qualidade</span>
      </h1>
      <div className="container lg:px-16 grid lg:grid-cols-2 gap-2 pt-16">
        <div className="bg-darkGray rounded-xl h-full p-8 space-y-2 z-10">
          <Target className="text-primary w-16 h-16" />
          <h1 className="text-white text-4xl font-bold">Missão</h1>
          <p className="text-gray">
            A Norasil tem como missão oferecer serviços de construção de elevada
            qualidade, focando na valorização constante das obras realizadas.
            Procuramos alcançar a plena satisfação dos nossos clientes através
            da validação sistemática de regras e práticas inovadoras.
          </p>
        </div>
        <div className="bg-darkGray rounded-xl h-full p-8 space-y-2 z-10">
          <Eye className="text-primary w-16 h-16" />
          <h1 className="text-white text-4xl font-bold">Visão</h1>
          <p className="text-gray">
            A Norasil visa ser referência em qualidade e inovação no mercado de
            obras públicas e privadas. Valorizamos a integração e satisfação dos
            colaboradores, estimulando o crescimento da qualidade e
            competitividade. Priorizamos a redução de custos sem comprometer a
            qualidade e eficácia dos serviços.
          </p>
        </div>
        <div className="bg-darkGray rounded-xl h-full p-8 space-y-2 z-10">
          <PieChart className="text-primary w-16 h-16" />
          <h1 className="text-white text-4xl font-bold">Valores</h1>
          <p className="text-gray">
            Na Norasil, damos valor ao cumprimento de compromissos com
            profissionalismo e responsabilidade. Buscamos a excelência nos
            nossos serviços, com ética, rigor e eficiência. Promovemos o
            trabalho em equipa e a melhoria contínua, reconhecendo a importância
            do esforço coletivo para o desempenho global da empresa.
          </p>
        </div>
        <div className="bg-darkGray rounded-xl h-full p-8 space-y-2 z-10">
          <Lightbulb className="text-primary w-16 h-16" />
          <h1 className="text-white text-4xl font-bold">Estratégia</h1>
          <p className="text-gray">
            A Norasil busca expansão nacional e internacional por meio de
            parcerias estratégicas que ajudem a alcançar uma vantagem
            competitiva e aumento de sinergias. Mantemos uma atividade econômica
            viável, com análise rigorosa de soluções técnicas e econômicas,
            visando o crescimento sustentável da empresa.
          </p>
        </div>
      </div>
      <div className="h-[600px] w-[600px] text-primary absolute -bottom-48 -left-48 border-[20px] border-primary rounded-full" />
    </div>
  );
};

export default QualityPolicy;
