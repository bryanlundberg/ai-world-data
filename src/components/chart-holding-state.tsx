import Image from "next/image";

export default function ChartHoldingState() {
  return (
    <>
      <div
        className="h-96 flex flex-col gap-3 items-center justify-center bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] glowing-effect relative"
        data-test="chart-zone-holding"
      >
        <div
          className="w-full h-full opacity-20 absolute rounded-md"
          style={{
            backgroundImage: "url(./hero.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          draggable={false}
        ></div>
        <Image
          src={"/vercel-logotype-dark.png"}
          alt="vercel-logotype-dark"
          width={500}
          height={200}
          className="px-3 dark:invert select-none"
          draggable={false}
          data-test="logotype vercel"
        />
        <p
          className="font-semibold text-lg opacity-90"
          data-test="chat-holding-state-subtitle"
        >
          Summer Hackathon 2024 Submission
        </p>
      </div>
    </>
  );
}
