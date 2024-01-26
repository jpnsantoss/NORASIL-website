"use client";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { Category } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import PostsSearch from "../PostsSearch";
import PortfolioPost from "./PortfolioPost";
import Sidebar from "./Sidebar";

interface PortfolioContainerProps {
  categories: Category[];
}

const PortfolioContainer: FC<PortfolioContainerProps> = ({ categories }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: initialPosts, isLoading: loadingInitialData } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/portfolio/initialData?category=${category}&status=${status}`
      );
      return data as ExtendedPost[];
    },
    queryKey: ["portfolio-query", category, status],
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite-query", initialPosts],
      queryFn: async ({ pageParam = 1 }) => {
        const query = `/api/portfolio?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}&category=${category}&status=${status}`;

        const { data } = await axios.get(query);
        return data as ExtendedPost[];
      },
      getNextPageParam: (_, pages) => {
        if (!pages[pages.length - 1]?.length) {
          return undefined; // No more pages to fetch
        }
        return pages.length + 1;
      },
      initialData: {
        pages: [initialPosts],
        pageParams: [1],
      },
      initialPageParam: 1, // Add this line
    });

  useEffect(() => {
    if (entry?.isIntersecting && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, isFetchingNextPage, hasNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts ?? [];

  return (
    <div className="grid lg:grid-cols-4 gap-16 container">
      <div>
        <Sidebar categories={categories} />
      </div>
      <div className="lg:col-span-3 lg:col-start-2 w-full h-full space-y-16">
        <div className="px-4 lg:w-1/2">
          <PostsSearch />
        </div>
        <div className="w-full min-h-[screen] space-y-16 lg:space-y-32">
          {loadingInitialData && (
            <div className=" w-full h-[60vh] text-center flex justify-center">
              <Loader2 className="w-16 h-16 animate-spin" />
            </div>
          )}
          {posts && posts.length > 0 ? (
            posts.map((post, index) => {
              if (post) {
                if (index === posts.length - 1) {
                  return (
                    <div key={post.id} ref={ref}>
                      <PortfolioPost post={post} />
                    </div>
                  );
                } else {
                  return <PortfolioPost key={post.id} post={post} />;
                }
              }
            })
          ) : (
            <div className=" w-full text-center flex justify-center">
              <h2 className="text-2xl">Não existem obras disponíveis.</h2>
            </div>
          )}
          {isFetchingNextPage && (
            <div className="w-full text-center flex justify-center py-8">
              <Loader2 className="w-6 h-6 text-darkGray animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioContainer;
