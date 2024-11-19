"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Trophy, Menu } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-blue-300">
      <nav className="flex items-center justify-between p-4 md:px-6">
        <div className="flex items-center gap-8">
          <a href="#" className="text-xl font-bold">
            AI Prompt Library™
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm">Sleman, 1:29pm</span>
          <LoginLink postLoginRedirectURL="/library">
            <Button
              variant="default"
              className="bg-black text-white rounded-full hover:bg-black/90"
            >
              Login
            </Button>
          </LoginLink>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <a
                  href="#"
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  Browse Talents
                </a>
                <a
                  href="#"
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  How It Works
                </a>
                <a
                  href="#"
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  For Clients
                </a>
                <a
                  href="#"
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  For Talents
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-24 text-center">
        <div className="inline-flex items-center gap-1 bg-white rounded-full px-4 py-2 mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-orange-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm">Rated 5/5 from over 700 reviews</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-4">
          Find Best
          <span className="inline-flex items-center">
            <div className="">
              <Trophy className="h-6 w-6 md:h-12 md:w-12 text-blue-500 mx-2 " />
            </div>
            Prompts
          </span>{" "}
          to Bring Your Ideas to Life{" "}
          <span className="inline-flex items-center">
            <span className="bg-orange-500 text-white text-sm px-4 py-1 rounded-full ml-2">
              Collaborate
            </span>
          </span>
        </h1>

        <p className="text-sm text-gray-600 mb-8">
          Get the most precise and cureted prompts by professional prompt
          engineers.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <RegisterLink postLoginRedirectURL="/library">
            <Button className="bg-black text-white rounded-full hover:bg-black/90 px-8">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Get Started
            </Button>
          </RegisterLink>
          <Button variant="outline" className="rounded-full px-8">
            Explore Services
          </Button>
        </div>
      </main>
    </div>
  );
}
