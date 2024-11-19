"use client";

import { Mail } from "../utils/data";
import { cn } from "../lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import useCategoryStore from "../lib/store";
import {ThumbsUp} from "lucide-react";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";


interface Prompts {
  _id?: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
}

interface MailListProps {
  items: Mail[];
}

export function MailList({ items, prompts }: {items: MailListProps; prompts: Prompts[]}) {
  const { category, promptValue, setPromptValue } = useCategoryStore();
  const [clicked, setIsClicked] = useState(false);

  return (
    <ScrollArea className="h-[82vh]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {prompts
          ?.slice()
          .filter((prompt: Prompts) => category?.toLowerCase() === prompt?.category?.toLowerCase())
          .map((prompt: Prompts) => (
            <button
              key={prompt._id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                prompt._id === promptValue._id && "bg-neutral-50/70 relative z-10"
              )}
              onClick={() => setPromptValue(prompt)}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{prompt.title}</div>
                  </div>
                </div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {prompt.prompt.substring(0, 300)}
              </div>
              {prompt.category ? (
                <div className="flex items-center space-x-5">
                  <Badge key={prompt._id} variant="secondary">
                    {prompt.category}
                  </Badge>

                  <BiSolidLike onClick={() => setIsClicked(true)} 
                    className={`${clicked ? "text-black" : "text-zinc-400"} relative z-50`} size={20} 
                  />
                </div>
              ) : null}
            </button>
          ))}
      </div>
    </ScrollArea>
  );
}

