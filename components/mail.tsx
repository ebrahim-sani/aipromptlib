"use client";

import * as React from "react";
import {
  ScrollText,
  BriefcaseBusiness,
  WalletCards,
  Search,
  SquareChevronRight,
  BrainCircuit,
  Bot,
  MonitorCog,
} from "lucide-react";
import { TooltipProvider } from "./ui/tooltip";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ui/resizable";
import { Separator } from "./ui/separator";
import { Nav } from "./nav";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { MailList } from "./mail-list";
import { MailDisplay } from "./mail-display";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Mail } from "../utils/data";
import connectDB from "../lib/mongodb";

type PageProps = {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  Prompt: {
    _id?: string;
    title: string;
    description: string;
    prompt: string;
    category: string;
  },
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
  prompts
}: PageProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const getNumberOfPrompts = (category: string) => {
    if (prompts?.length){
      const num = prompts.slice().filter((prompt: any) => category.toLowerCase() === prompt.category.toLowerCase()).length;
      return num;
    }
    return 0;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-start",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <h1 className="font-bold text-lg">AI Prompt Library</h1>
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Productivity",
                label: getNumberOfPrompts("Productivity"),
                icon: BriefcaseBusiness
              },
              {
                title: "Software Applications",
                label: getNumberOfPrompts("Software Applications"),
                icon: MonitorCog
              },
              {
                title: "Generative AI",
                label: getNumberOfPrompts("Generative AI"),
                icon: BrainCircuit
              },
              {
                title: "Software Engineering",
                label: getNumberOfPrompts("Software Engineering"),
                icon: SquareChevronRight
              },
              {
                title: "Copywriting",
                label: getNumberOfPrompts("Copywriting"),
                icon: ScrollText
              },
              {
                title: "Marketing",
                label: getNumberOfPrompts("Marketing"),
                icon: WalletCards
              },
              {
                title: "Devops",
                label: getNumberOfPrompts("Devops"),
                icon: Bot
              },
            ]}
          />
          <Separator />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex items-center px-4 py-3.5">
            <h1 className="text-md font-bold">Prompts List</h1>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
          <MailList prompts={prompts} items={mails} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
