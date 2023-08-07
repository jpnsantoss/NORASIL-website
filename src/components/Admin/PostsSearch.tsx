"use client";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Post, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { Dot } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/Command";

interface PostsSearchProps {}

const PostsSearch: FC<PostsSearchProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const {
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/posts/search?q=${input}`);
      return data as (Post & {
        _count: Prisma.PostCountOutputType;
      })[];
    },
    queryKey: ["admin-search-query"],
    enabled: false,
  });

  const request = debounce(() => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, [request]);

  const commandRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search for posts..."
      />

      {input.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Posts">
              {queryResults?.map((post) => (
                <CommandItem
                  key={post.id}
                  value={post.name}
                  onSelect={(e) => {
                    router.push(`/admin/posts/${e}`);
                    router.refresh();
                  }}
                >
                  <Dot className="mr-2 w-4 h-4" />
                  <a href={`/admin/posts/${post.name}`}>{post.title}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  );
};

export default PostsSearch;
