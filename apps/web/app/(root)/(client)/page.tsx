import { Button, buttonVariants } from "@ui/components/Button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center w-full">
      <div className="flex max-w-[800px]  flex-col text-center  gap-4 mx-auto w-fit ">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          Welcome to Vehicle Rental
        </h1>
        <div className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Explore our wide range of vehicles for your next adventure. From
          compact cars to spacious SUVs, we've got you covered.
        </div>
        <div>
          <Link
            href={"/book"}
            className={buttonVariants({
              size: "lg",
            })}
          >
            Book Vehicle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
