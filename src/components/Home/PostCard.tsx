import { ExtendedPost } from "@/types/db";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { Calendar, Contact, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Separator } from "../ui/Separator";

interface PostCardProps {
  post: ExtendedPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div className="relative shadow rounded-3xl">
      <div className="w-full h-64 rounded-t-3xl overflow-hidden relative">
        <Image
          alt={post.title}
          src={post.mainImageUrl}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="w-full relative h-56">
        <div className="absolute -top-8 w-full bg-white rounded-t-3xl h-full overflow-hidden">
          <div className="relative h-full w-full p-8">
            <h1 className="font-bold text-2xl text-center truncate">
              {post.title}
            </h1>
            <Separator className="my-8 bg-black" />
            <ul className="px-4 text-darkGray space-y-2">
              <li className="flex gap-2 items-center">
                <Contact className="w-5 h-5 text-primary" />
                {post.client}
              </li>
              <li className="flex gap-2 items-center">
                <Calendar className="w-5 h-5 text-primary" />
                {format(post.date, "dd/MM/yyyy")}
              </li>
              <li>
                <Link
                  href="#"
                  className="flex gap-2 items-center hover:underline"
                >
                  <Link2 className="w-5 h-5 text-primary" />
                  {post.category.title}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
