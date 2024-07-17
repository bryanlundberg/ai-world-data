import { Button } from "./ui/button";

export default function Footer() {
  return (
    <>
      <div className="flex items-center justify-center my-10">
        Made with ❤️ by{" "}
        <span>
          <Button variant="link">Bryan</Button>
        </span>
      </div>
    </>
  );
}
