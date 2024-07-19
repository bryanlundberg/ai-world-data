"use client";
import Logo from "./logo";
import Link from "next/link";
import { Github } from "lucide-react";
import { ModeToggle } from "./switch-theme";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex justify-between w-full px-3 py-3 mx-auto mb-3 max-w-screen-2xl">
        <Logo />

        <div className="flex items-center gap-3">
          <Link
            draggable={false}
            href="/playground"
            className={`light:text-black light:text-white transition duration-300 ${
              pathname === "/playground"
                ? "font-semibold underline underline-offset-4 opacity-100"
                : "opacity-90 hover:opacity-100"
            }`}
          >
            Playground
          </Link>
          <a
            href="https://github.com/bryanlundberg/ai-world-data"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-end gap-1">
              <div className="flex items-center justify-center w-6 h-6 p-1 transition duration-500 rounded-full bg-white hover:bg-zinc-950 border border-neutral-500 text-neutral-800 hover:text-white hover:rotate-45">
                <Github />
              </div>
            </div>
          </a>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
