import Image from "next/image";

export default function ChartHoldingState() {
  return (
    <>
      <div
        className="h-96 flex flex-col gap-3 items-center justify-center bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] glowing-effect relative text-center"
        data-test="chart-zone-holding"
      >
        <Image
          src={"/hero.webp"}
          className="w-full h-full dark:opacity-20 opacity-10 absolute rounded-md"
          draggable={false}
          width={400}
          height={200}
          alt=""
        />
        {/* <Image
          src={"/vercel-logotype-dark.png"}
          alt="vercel-logotype-dark"
          width={500}
          height={200}
          className="px-3 dark:invert select-none z-10 "
          draggable={false}
          data-test="logotype vercel"
        /> */}
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          Explore your curiosity
        </h2>
        <h3 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl italic">
          &quot;Discover the world around you&quot;
        </h3>
        {/* <p
          className="font-semibold text-lg opacity-90"
          data-test="chat-holding-state-subtitle"
        >
          Summer Hackathon 2024 Submission
        </p> */}
      </div>
    </>
  );
}
