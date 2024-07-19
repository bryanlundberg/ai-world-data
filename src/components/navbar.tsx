"use client";
import Logo from "./logo";
import { Github } from "lucide-react";
import { ModeToggle } from "./switch-theme";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <nav className="flex justify-between w-full px-3 py-3 mx-auto mb-3 max-w-screen-2xl">
        <Logo />

        <div className="flex items-center gap-3">
          {pathname !== "/playground" && (
            <Button
              onClick={() => router.push("/playground")}
              disabled={pathname === "/playground"}
            >
              Playground
            </Button>
          )}

          <a
            href="https://github.com/bryanlundberg/ai-world-data"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-end gap-1">
              <div className="flex items-center justify-center w-6 h-6 p-1 transition duration-500 rounded-full hover:bg-zinc-950 border-neutral-500 hover:text-white hover:rotate-45 dark:bg-white  border dark:border-white dark:hover:shadow dark:hover:text-black text-white bg-black dark:text-black">
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
