"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Slogan from "@/components/slogan";
import { ChartHome } from "@/components/chart-home";
import { Lightbulb } from "lucide-react";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-20">
          <Slogan />
          <div className="my-10"></div>
          <ChartHome />

          <Link href={"/playground"}>
            <Button>
              <Lightbulb className="w-4 h-4 mr-2" /> Go playground
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
