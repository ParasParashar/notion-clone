"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
  return (
    <div className="flex flex-col p-1 border items-center justify-center h-full space-y-4">
      <h3 className="text-xl font-medium">Ohh...Someting went wrong!!!!</h3>
      <Button className="text-lg" variant={"outline"} size={"lg"}>
        <Link href={"/documents"}>Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
