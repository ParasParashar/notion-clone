"use client";

import Cover from "@/components/Cover";
import Editor from "@/components/Editor";
import { ToolBar } from "@/components/ToolBar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface documentIdProps {
  params: { documentId: Id<"documents"> };
}
const Page = ({ params }: documentIdProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );
  const update = useMutation(api.documents.update);
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-12 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (document === null) {
    return <div>Document not found</div>;
  }

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };
  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl  lg:max-w-4xl mx-auto">
        <ToolBar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default Page;
