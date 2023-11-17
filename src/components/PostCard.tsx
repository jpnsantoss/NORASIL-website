import { ExtendedPost } from "@/types/db";
import { format } from "date-fns";
import { Calendar, Contact, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Separator } from "./ui/Separator";

interface PostCardProps {
  post: ExtendedPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div className="relative shadow rounded-3xl">
      <div className="w-full min-h-[25vh] rounded-t-3xl overflow-hidden group relative">
        <Image
          alt={post.title}
          src={post.mainImageUrl}
          fill
          className="object-center object-cover group-hover:scale-105 transition ease-in-out duration-500"
        />
      </div>
      <div className="w-full relative h-56">
        <div className="absolute -top-8 w-full bg-white rounded-t-3xl h-full overflow-hidden">
          <div className="relative h-full w-full p-8">
            <h1 className="font-bold text-2xl text-center truncate">
              <Link className="hover:underline" href={`/obras/${post.name}`}>
                {post.title}
              </Link>
            </h1>
            <Separator className="my-8 bg-black" />
            <ul className="px-4 text-darkGray space-y-2">
              <li className="flex gap-2 items-center truncate">
                <Contact className="w-5 h-5 text-primary" />
                {post.client}
              </li>
              <li className="flex gap-2 items-center truncate">
                <Calendar className="w-5 h-5 text-primary" />
                {post.deadline}
              </li>
              <li>
                <Link
                  href="#"
                  className="flex w-fit gap-2 items-center hover:underline truncate"
                >
                  <Link2 className="w-5 h-5 text-primary " />
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
