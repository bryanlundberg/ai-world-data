export default function Logo() {
  return (
    <>
      <p className="text-2xl font-extrabold tracking-tight scroll-m-20">
        <span className="p-1 py-0 text-2xl font-bold text-white bg-black rounded-md max-w-10 dark:bg-white dark:text-black">
          AI
        </span>{" "}
        W
        <span>
          <img
            src={"/planet-earth.gif"}
            alt=""
            className="inline-block w-6 h-6 mb-1 select-none"
          />
        </span>
        RLD DATA
      </p>
    </>
  );
}
