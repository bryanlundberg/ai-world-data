"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();
  return (
    <>
      <div className="text-md font-extrabold tracking-tight select-none scroll-m-20 flex items-center justify-start gap-1">
        <Link href={"/"} draggable={false}>
          <span className="p-1 px-2 text-2xl text-white bg-black rounded-md max-w-10 dark:bg-white dark:text-black me-2">
            AI
          </span>
        </Link>{" "}
        {pathname !== "/playground" ? (
          <div className="flex flex-col sm:flex-row sm:gap-2 gap-0 sm:text-lg md:text-xl lg:text-2xl">
            <div className="">
              <span>W</span>
              <Image
                src={"/world.webp"}
                alt=""
                width={20}
                height={20}
                className="inline-block w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mb-1 select-none"
                draggable={false}
              />
              <span>RLD</span>
            </div>

            <span className="text-md">DATA.</span>
          </div>
        ) : (
          <div className="flex gap-2 sm:text-lg md:text-xl lg:text-2xl">
            Playground
          </div>
        )}
      </div>
    </>
  );
}
