"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-coverImage";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface props {
  url?: string;
  preview?: boolean;
}
const Cover = ({ url, preview }: props) => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const coverimage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };
  return (
    <div
      className={cn(
        "relative w-full h-[40vh] group ",
        !url && "h-[12vh] ",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div
          className="opacity-0 group-hover:opacity-100 absolute bottom-0 right-5
        flex items-center gap-x-2 p-2"
        >
          <Button
            onClick={() => coverimage.onReplace(url)}
            size={"sm"}
            className="text-muted-foreground  text-xs"
            variant={"outline"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change a Cover
          </Button>
          <Button
            onClick={onRemove}
            size={"sm"}
            className="text-muted-foreground  text-xs"
            variant={"outline"}
          >
            <X className="h-4 w-4 mr-2" />
            Remove a Cover
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh] " />;
};
