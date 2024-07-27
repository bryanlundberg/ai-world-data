export default function ChartHoldingState() {
  return (
    <>
      <div
        className="h-96 flex flex-col gap-3 items-center justify-center bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] glowing-effect relative text-center"
        data-test="chart-zone-holding"
      >
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          Release your curiosity
        </h2>
        <h3 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl italic">
          &quot;Discover the world around you&quot;
        </h3>
      </div>
    </>
  );
}
