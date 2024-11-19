"use client";

import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import useCategoryStore from "../lib/store";
import { useState, useEffect, useRef } from "react";
import MarkdownRenderer from "../lib/markdownRenderer";
import Chathead from "./chathead";


export function MailDisplay() {
  const { promptValue } = useCategoryStore();
  const [promptData, setPromptData] = useState<string | undefined>(
    promptValue.prompt
  );
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setPromptData(promptValue.prompt);
  }, [promptValue.prompt]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = async () => {
    const user_message = {
      role: "user",
      message: promptData,
    };

    setMessages((prevMessages) => [...prevMessages, user_message]);

    try {
      const res = await fetch("/api/chat-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: promptData }),
      });

      const data = await res.text();
      const ai_response = {
        role: "ai",
        message: data,
      };

      setMessages((prevMessages) => [...prevMessages, ai_response]);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(messages);

  return (
    <div className="flex h-full flex-col">
      <Chathead />
      <Separator />
      <div className="flex flex-1 h-full m-2 px-2 w-full flex-grow">
        <ScrollArea className="flex-grow flex w-full" ref={scrollAreaRef}>
          <div className="flex w-full h-full">
            {messages.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <h2 className="font-bold text-2xl">
                    How can I help you today?
                  </h2>
                  <p className="text-xs">Choose any prompt to start..</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col item-start w-full space-y-2">
                {messages?.map((message, i) => (
                  <div
                    key={i}
                    className={`${
                      message?.role === "user" &&
                      "flex items-end justify-end w-full"
                    }`}
                  >
                    <div
                      className={`flex ${
                        message?.role === "user" && "flex-row-reverse"
                      } items-start space-x-1 w-2/3`}
                    >
                      {/* <div className="h-12 w-12">
                        <Image
                          src={`/${
                            message?.role === "user" ? "user.png" : "ai.jpg"
                          }`}
                          alt=""
                          width={200}
                          height={200}
                        />
                      </div> */}
                      <div className="p-2 bg-neutral-50 border text-xs rounded-xl w-[96%] h-full">
                        <MarkdownRenderer markdown={message?.message} />
                        {/* <p className="text-xs">{message?.message}</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div ref={bottomRef} />
        </ScrollArea>
      </div>
      <div className="px-4 pb-4 pt-1">
        <form>
          <div className="grid gap-4">
            <Textarea
              className="p-4 max-h-[150px]"
              placeholder={`Send prompt...`}
              value={promptData || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPromptData(e.target.value)
              }
            />
            <div className="flex items-center">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onSend();
                }}
                size="sm"
                className="ml-auto"
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
