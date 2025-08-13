import React from "react";
import Image from "next/image";
import { CgSpinner } from "react-icons/cg";

interface LoadingProps {
  className?: string;
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 p-4 ${
        className || ""
      }`}
    >
      <Image
        src="/images/loading.png"
        alt="Loading..."
        width={200}
        height={200}
        quality={100}
        className="object-contain w-full h-full"
      />
      <p className="flex justify-center items-center gap-1 text-center text-gray-500 text-sm">
        <CgSpinner className="text-lg animate-spin" /> Loading...
      </p>
    </div>
  );
}
