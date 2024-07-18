import { Skeleton } from "./ui/skeleton";

export default function LoadingChart() {
  return (
    <>
      <div className="my-3 w-full px-3">
        <Skeleton className="w-10/12 h-[30px] rounded-full mt-3" />
        <Skeleton className="w-5/12 h-[20px] rounded-full mt-2" />
        <Skeleton className="w-full h-[200px] rounded-md mt-5 mx-auto" />
      </div>
    </>
  );
}
