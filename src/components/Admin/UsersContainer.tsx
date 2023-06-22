import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Separator } from "../ui/Separator";
import { default as UsersForm } from "./UsersForm";

const UsersContainer = () => {
  return (
    <Card className="h-[45vh] overflow-y-hidden">
      <CardHeader>
        <CardTitle>Authorized Users</CardTitle>
        <CardDescription>
          List of users that can access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersForm />
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">People with access</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersContainer;
