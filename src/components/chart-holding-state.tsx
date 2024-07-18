import Image from "next/image";

export default function ChartHoldingState() {
  return (
    <>
      <div className="h-96 flex flex-col gap-3 items-center justify-center bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <Image
          src={"/vercel-logotype-dark.png"}
          alt="vercel-logotype-dark"
          width={500}
          height={200}
          className="px-3 dark:invert"
        />
        <p className="font-semibold text-lg opacity-70">
          Summer Hackathon 2024 Submission
        </p>
      </div>
    </>
  );
}
