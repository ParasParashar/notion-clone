import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex dark:bg-[#1f1f1f] bg-transparent flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src="/idea.png"
            fill
            className="object-contain"
            alt="Documents"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
