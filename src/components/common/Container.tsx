import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`px-4 lg:px-16 2xl:container flex justify-center items-center w-full h-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
