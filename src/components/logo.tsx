import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <>
      <div className="text-md font-extrabold tracking-tight select-none scroll-m-20 flex items-center justify-start gap-1">
        <Link href={"/"} draggable={false}>
          <span className="p-1 px-2 text-2xl text-white bg-black rounded-md max-w-10 dark:bg-white dark:text-black me-2">
            AI
          </span>
        </Link>{" "}
        <div className="flex gap-2 sm:text-lg md:text-xl lg:text-2xl">
          <div className="">
            <span>W</span>
            <Image
              src={"/planet-earth.gif"}
              alt=""
              width={20}
              height={20}
              className="inline-block w-6 h-6 mb-1 select-none"
              draggable={false}
            />
            <span>RLD</span>
          </div>

          <span className="text-md">DATA.</span>
        </div>
      </div>
    </>
  );
}
