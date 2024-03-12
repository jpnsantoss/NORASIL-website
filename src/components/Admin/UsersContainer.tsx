import { acceleratedDb } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Separator } from "../ui/Separator";
import { default as UsersForm } from "./UsersForm";
import UsersList from "./UsersList";

const UsersContainer = async () => {
  const authorizedEmails = await acceleratedDb.authorizedEmail.findMany({
    include: {
      user: true,
    },
    cacheStrategy: { ttl: 60 },
  });

  return (
    <Card className="h-fit">
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
          <UsersList authorizedEmails={authorizedEmails} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersContainer;
