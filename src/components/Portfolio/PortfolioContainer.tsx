"use client";
import { ExtendedPost } from "@/types/db";
import { Category, Post } from "@prisma/client";
import { FC, createContext, useEffect, useState } from "react";
import PostsSearch from "../Admin/PostsSearch";
import PortfolioPost from "./PortfolioPost";
import Sidebar from "./Sidebar";

interface PortfolioContainerProps {
  categories: Category[];
  posts: ExtendedPost[];
}

interface PortfolioContextType {
  category: null | string; // Adjust the type as needed
  setCategory: React.Dispatch<React.SetStateAction<null | string>>; // Adjust the type as needed
  status: null | string; // Adjust the type as needed
  setStatus: React.Dispatch<React.SetStateAction<null | string>>; // Adjust the type as needed
}

export const PortfolioContext = createContext<PortfolioContextType | null>(
  null
);

const PortfolioContainer: FC<PortfolioContainerProps> = ({
  posts,
  categories,
}) => {
  const [category, setCategory] = useState<null | string>(null);
  const [status, setStatus] = useState<null | string>(null);

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <div className="mx-auto w-full lg:px-16 grid lg:grid-cols-4 gap-16 my-16">
      <PortfolioContext.Provider
        value={{ category, setCategory, status, setStatus }}
      >
        <Sidebar categories={categories} />
      </PortfolioContext.Provider>
      <div className="lg:col-span-3 lg:col-start-2 w-full h-full space-y-16">
        <div className="px-4 lg:w-1/2">
          <PostsSearch />
        </div>
        <div className="w-full space-y-16 lg:space-y-32">
          {posts.map((post) => (
            <PortfolioPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioContainer;
