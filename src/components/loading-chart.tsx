import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { LoaderCircle } from "lucide-react";

export default function LoadingChart() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 0.01);
    }, 10);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="w-full px-3" data-test="loading-chart">
        <Skeleton className="w-10/12 h-[30px] rounded-full mt-3" />
        <Skeleton className="w-5/12 h-[20px] rounded-full mt-2" />
        <Skeleton className="w-full h-[200px] rounded-md mt-5 mx-auto" />
        <div className="flex gap-2 items-center my-3">
          <LoaderCircle className="animate-spin w-4" data-test="spinner" />
          <p className="text-xs font-mono">{seconds.toFixed(2)} sec</p>
        </div>
      </div>
    </>
  );
}
