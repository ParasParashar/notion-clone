"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { resetPaginationId, useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./Title";
import { Banner } from "./Banner";
import { Menu } from "./Menu";
import { Button } from "@/components/ui/button";
import Publish from "./Publish";

type props = {
  isCollapse: boolean;
  onResetWidth: () => void;
};
const NavbarMain = ({ isCollapse, onResetWidth }: props) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });
  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 w-full py-2 flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }
  if (document === null) {
    return null;
  }
  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 w-full py-2 flex items-center gap-x-4">
        {isCollapse && (
          <Button variant={"ghost"} size={"icon"}>
            <MenuIcon
              role=" button"
              onClick={onResetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
          </Button>
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default NavbarMain;
