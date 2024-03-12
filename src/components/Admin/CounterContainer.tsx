import db from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import CounterForm from "./CounterForm";

const CounterContainer = async ({}) => {
  const counter = (await db.counter.findFirst()) || {
    id: "0",
    finishedBuilds: "0",
    constructionBuilds: "0",
    awards: "0",
  };
  return (
    <Card className="lg:h-64">
      <CardHeader>
        <CardTitle>Counters</CardTitle>
        <CardDescription>
          List of users that can access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CounterForm counter={counter} />
      </CardContent>
    </Card>
  );
};

export default CounterContainer;
