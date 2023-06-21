import { X } from "lucide-react";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Input } from "./ui/Input";
import { Separator } from "./ui/Separator";

interface AuthorizedEmailsProps {}

const AuthorizedEmails: FC<AuthorizedEmailsProps> = ({}) => {
  return (
    <Card className="h-[45vh] overflow-y-hidden">
      <CardHeader>
        <CardTitle>Authorized Users</CardTitle>
        <CardDescription>
          List of users that can access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input type="email" placeholder="Email" />
          <Button className="shrink-0">Add</Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">People with access</h4>
          <div className="grid gap-6 max-h-[25vh] overflow-y-auto">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="hidden lg:block">
                  <AvatarImage src="/avatars/03.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    João Santos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jpnsantos14@gmail.com
                  </p>
                </div>
              </div>
              <Button variant="ghost">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorizedEmails;
