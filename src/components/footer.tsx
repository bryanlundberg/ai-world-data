import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <>
      <div className="flex items-center justify-center my-10">
        Made with ❤️ by{" "}
        <Link
          href={"https://github.com/bryanlundberg"}
          target="_blank"
          draggable={false}
        >
          <Button variant="link">Bryan</Button>
        </Link>
      </div>
    </>
  );
}
