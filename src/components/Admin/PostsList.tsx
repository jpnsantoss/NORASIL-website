import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { Button, buttonVariants } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Command, CommandInput } from "../ui/Command";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";

interface PostsListProps {}

const posts = [
  {
    id: 1,
    title: "Isto é apenas um teste",
    type: "In construction",
    client: "Continental",
    date: "28/06/2023",
    category: "Industrial",
  },
  {
    id: 1,
    title: "Isto é apenas um teste",
    type: "In construction",
    client: "Continental",
    date: "28/06/2023",
    category: "Industrial",
  },
  {
    id: 1,
    title: "Isto é apenas um teste",
    type: "In construction",
    client: "Continental",
    date: "28/06/2023",
    category: "Industrial",
  },
  {
    id: 1,
    title: "Isto é apenas um teste",
    type: "In construction",
    client: "Continental",
    date: "28/06/2023",
    category: "Industrial",
  },
  {
    id: 1,
    title: "Isto é apenas um teste",
    type: "In construction",
    client: "Continental",
    date: "28/06/2023",
    category: "Industrial",
  },
];

const PostsList: FC<PostsListProps> = ({}) => {
  return (
    <Card>
      <CardHeader>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <CardTitle>Posts List</CardTitle>
            <CardDescription>List of created posts.</CardDescription>
          </div>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search for a build..." />
          </Command>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.type}</TableCell>
                <TableCell>{post.client}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline">Edit</Button>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div
                        className={cn(
                          buttonVariants({ variant: "destructive" }),
                          "text-black hover:text-white"
                        )}
                      >
                        <X className="w-4 h-4" />
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this category and all the posts associated to
                          it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                        // onClick={() => {
                        //   if (item.email) deleteUser({ email: item.email });
                        // }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PostsList;
