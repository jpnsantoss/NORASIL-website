"use client";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import PostRow from "./PostRow";

interface PostsListProps {
  initialPosts: ExtendedPost[];
}

const PostsList: FC<PostsListProps> = ({ initialPosts }) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [initialPosts],
        pageParams: [1],
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

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
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <TableRow key={post.id} ref={ref}>
                <PostRow post={post} />
              </TableRow>
            );
          } else {
            return (
              <TableRow key={post.id}>
                <PostRow post={post} />
              </TableRow>
            );
          }
        })}
        {isFetchingNextPage && (
          <TableRow>
            <TableCell>
              <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PostsList;
