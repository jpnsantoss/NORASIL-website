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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[150px]">Title</TableHead>
          <TableHead className="hidden lg:table-cell">Type</TableHead>
          <TableHead className="hidden lg:table-cell">Client</TableHead>
          <TableHead className="hidden lg:table-cell">Date</TableHead>
          <TableHead className="hidden lg:table-cell">Category</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell className="hidden lg:table-cell">{post.type}</TableCell>
            <TableCell className="hidden lg:table-cell">
              {post.client}
            </TableCell>
            <TableCell className="hidden lg:table-cell">{post.date}</TableCell>
            <TableCell className="hidden lg:table-cell">
              {post.category}
            </TableCell>
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
                      This action cannot be undone. This will permanently delete
                      this category and all the posts associated to it.
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
  );
};

export default PostsList;
