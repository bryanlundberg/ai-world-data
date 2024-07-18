"use client";
import Image from "next/image";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { useEffect, useState } from "react";
import { generateText } from "ai";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Slogan from "@/components/slogan";
import { ChartHome } from "@/components/chart-home";
import { Lightbulb } from "lucide-react";
import Footer from "@/components/footer";

export default function Home() {
  // useEffect(() => {
  //   async function name() {
  //     try {
  //       const google = createGoogleGenerativeAI({
  //         baseURL: "https://generativelanguage.googleapis.com/v1beta/models/",
  //         apiKey: "AIzaSyBfG-8AtDeABoEtugLuPfvp2NzWdWqnw00",
  //       });

  //       const { text } = await generateText({
  //         model: google("gemini-1.5-flash-latest"),
  //         prompt: "Write a vegetarian lasagna recipe for 4 people.",
  //       });

  //       console.log(text);
  //       return text;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   name();
  // }, []);
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-20">
          <Slogan />
          <div className="my-10"></div>
          <ChartHome />

          <Button>
            <Lightbulb className="w-4 h-4 mr-2" /> Go playground
          </Button>
        </div>
        <Footer />
      </div>
    </>
  );
}
