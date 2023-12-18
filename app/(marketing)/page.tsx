import Heroes from "./_components/Heroes";
import Footer from "./_components/Footer";
import { Heading } from "./_components/Heading";

const Home = () => {
  return (
    <div className="min-h-full dark:bg-[#1f1f1f]  bg-transparent flex flex-col">
      <div className="flex flex-col justify-center items-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
