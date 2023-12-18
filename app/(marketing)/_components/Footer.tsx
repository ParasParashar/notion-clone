import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1f1f1f]">
      <Logo />
      <div className="md:ml-auto  w-full justify-between flex items-center md:justify-end gap-x-2  text-muted-foreground">
        <Button  variant={'ghost'} size={'sm'}>Privacy Policy</Button>
        <Button  variant={'ghost'} size={'sm'}>Terms and Condition</Button>
      </div>
    </div>
  );
};

export default Footer;
