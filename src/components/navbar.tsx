import { GithubIcon } from "lucide-react";
import Logo from "./logo";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between h-10 px-3 py-3">
        <Logo />

        <div className="flex gap-3">
          <div>Playground</div>
          <a
            href="https://github.com/bryanlundberg/ai-world-data"
            target="_blank"
          >
            <div className="flex items-center justify-center w-6 h-6 p-1 transition duration-200 rounded-full bg-zinc-800 hover:bg-zinc-950">
              <GithubIcon size={24} color="white" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
