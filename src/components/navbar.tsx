import { GithubIcon } from "lucide-react";
import Logo from "./logo";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between w-full h-10 px-3 py-3 mx-auto mb-3 max-w-screen-2xl">
        <Logo />

        <div className="flex gap-3">
          <NavLink
            to={"/playground"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "underline" : ""
            }
          >
            Playground
          </NavLink>
          <a
            href="https://github.com/bryanlundberg/ai-world-data"
            target="_blank"
          >
            <div className="flex items-center justify-center w-6 h-6 p-1 transition duration-200 rounded-full bg-zinc-800 hover:bg-zinc-950">
              <GithubIcon size={24} color="white" />
            </div>
          </a>
        </div>
      </nav>
    </>
  );
}
