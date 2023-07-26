import { Post } from "@prisma/client";
import { FC } from "react";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return <div>{post.title}</div>;
};

export default PostCard;
