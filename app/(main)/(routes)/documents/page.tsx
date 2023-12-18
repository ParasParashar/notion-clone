"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((res) => {
      router.push(`/documents/${res}`);
    });
    toast.promise(promise, {
      loading: "Create a New Note...",
      success: "New Note Created!!",
      error: "Failed to create a new note",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-lg font-serif font-medium">
        Welcome to {user?.firstName}&apos;s Notion{" "}
      </h2>
      <div className="relative w-full my-3 h-1/2 object-contain">
        <Image
          src="/home-light.png"
          fill
          alt="Create"
          className="object-contain  w-[300px] h-1/2 dark:hidden"
        />
        <Image
          src="/home-dark.png"
          fill
          alt="Create"
          className="object-contain  w-[300px] h-1/2 dark:block hidden"
        />
      </div>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2 " />
        Create a note.
      </Button>
    </div>
  );
};

export default Page;
