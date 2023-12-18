"use client";

import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  PlusCircleIcon,
  Search,
  Settings,
  Settings2,
  Trash,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./UserItem";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { toast } from "sonner";
import { DocumentList } from "./DocumentList";
import { on } from "events";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import TrashBox from "./TrashBox";
import { useSearch } from "@/hooks/use-Search";
import { useSettings } from "@/hooks/use-Setting";
import { Navbar } from "@/app/(marketing)/_components/Navbar";
import NavbarMain from "./NavbarMain";

const Navigation = () => {
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:768px)");
  const isResizing = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsresetting] = useState(false);
  const [isCollapse, setIsCollapse] = useState(isMobile);
  const onOpenSearchCommand = useSearch((store) => store.onOpen);
  const onOpenSettingCommand = useSettings((store) => store.onOpen);
  const create = useMutation(api.documents.create);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);
  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathName, isMobile]);
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = event.clientX;
    if (newWidth < 240) {
      newWidth = 240;
    }
    if (newWidth > 450) {
      newWidth = 450;
    }
    if (sidebarRef.current && navBarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty("width", `calc(100% -${newWidth}px)`);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((res) => {
      router.push(`/documents/${res}`);
    });
    toast.promise(promise, {
      loading: "Create a New Note...",
      success: "New Note Created!!",
      error: "Failed to create a new note",
    });
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const resetWidth = () => {
    if (sidebarRef.current && navBarRef.current) {
      setIsCollapse(false);
      setIsresetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navBarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navBarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "calc(100%-240px)"
      );
      setTimeout(() => {
        setIsresetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navBarRef.current) {
      setIsCollapse(true);
      setIsresetting(true);

      sidebarRef.current.style.width = "0";
      navBarRef.current.style.setProperty("width", "100%");
      navBarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsresetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 opacity-0 group-hover/sidebar:opacity-100 transition right-2   ",
            isMobile && " opacity-100"
          )}
        >
          <ChevronsLeft onClick={collapse} className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item
            onClick={onOpenSearchCommand}
            label="Search"
            icon={Search}
            isSearch
          />
          <Item
            onClick={onOpenSettingCommand}
            label="Setting"
            icon={Settings}
          />
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item
            onClick={handleCreate}
            label="Add a Page"
            icon={PlusCircleIcon}
          />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className=" w-72 bg-zinc-200/80 dark:bg-neutral-900 rounded-lg p-1"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onClick={resetWidth}
          onMouseDown={handleMouseDown}
          className="opacity-0 group-hover/sidebar:opacity-100 trasition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navBarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <NavbarMain isCollapse={isCollapse} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapse && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
