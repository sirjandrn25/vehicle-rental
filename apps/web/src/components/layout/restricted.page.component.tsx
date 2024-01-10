"use client";

import { Button } from "@ui/components/Button";
import { useRouter } from "next/navigation";

interface RestricatedPageInterface {
  title?: string;
  description?: string;
  message?: string;
}
export default function RestrictedPage({
  title,
  description,
  message,
}: RestricatedPageInterface) {
  const navigation = useRouter();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-4 text-center">
      {/* <img
        alt="Error Illustration"
        className="mb-8"
        height="300"
        src="/placeholder.svg"
        style={{
          aspectRatio: "600/300",
          objectFit: "cover",
        }}
        width="600"
      /> */}
      <h1 className="text-6xl font-bold text-gray-800">
        {title || "We are Sorry..."}
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        {description ||
          "The page you’re trying to access has restricted access."}
        <br />
        {message || "Please refer to your system administrator"}
      </p>
      <Button
        onClick={() => {
          navigation.back();
        }}
        className="mt-8"
        variant="default"
      >
        Go Back
      </Button>
    </div>
  );
}
