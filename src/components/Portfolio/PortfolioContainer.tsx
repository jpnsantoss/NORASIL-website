"use client";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { Category, Post } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FC, createContext, useEffect, useRef, useState } from "react";
import PostsSearch from "../Admin/PostsSearch";
import PortfolioPost from "./PortfolioPost";
import Sidebar from "./Sidebar";

interface PortfolioContainerProps {
  categories: Category[];
  posts: ExtendedPost[];
}

const PortfolioContainer: FC<PortfolioContainerProps> = ({ categories }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const [initialDataFetch, setInitialDataFetch] = useState(true);

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
    enabled: initialDataFetch,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query", initialPosts],
    async ({ pageParam = 1 }) => {
      const query = `/api/portfolio?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}&category=${category}&status=${status}`;

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
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
    }
  );

  let hasNextPage = false;

  if (data && data.pages && data.pages.length > 0) {
    const lastPage = data.pages[data.pages.length - 1];
    if (lastPage && lastPage.length > 0) {
      hasNextPage = true;
    }
  }

  useEffect(() => {
    if (entry?.isIntersecting && !isFetchingNextPage && hasNextPage) {
      setInitialDataFetch(false);
      fetchNextPage();
    }
  }, [entry, fetchNextPage, isFetchingNextPage, hasNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts ?? [];

  return (
    <div className="mx-auto w-full lg:px-16 grid lg:grid-cols-4 gap-16 my-16">
      <Sidebar categories={categories} />
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
                      <PortfolioPost post={post} />;
                    </div>
                  );
                } else {
                  return <PortfolioPost key={post.id} post={post} />;
                }
              }
            })
          ) : (
            <div className=" w-full h-[60vh] text-center flex justify-center">
              <h2 className="text-2xl">No posts to display.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioContainer;
