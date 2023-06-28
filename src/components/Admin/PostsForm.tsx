import { FC } from "react";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";

interface PostsFormProps {}

const PostsForm: FC<PostsFormProps> = ({}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
        <CardDescription>
          Create here posts to be displayed in the portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex space-x-2">
          <Input type="email" placeholder="Email" />
          <Button className="shrink-0">Add</Button>
        </form>
        {/* {errors?.email && (
          <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
        )} */}
      </CardContent>
    </Card>
  );
};

export default PostsForm;
