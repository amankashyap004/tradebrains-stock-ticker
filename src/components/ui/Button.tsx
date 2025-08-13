import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "danger";
}

export default function Button({
  children,
  onClick,
  className,
  variant = "default",
}: ButtonProps) {
  const baseClasses =
    "px-6 py-2 text-sm font-medium rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-right hover:scale-105";

  const variants = {
    default:
      "bg-[linear-gradient(90deg,#6db8fd,#1774ff,#6db8fd,#1774ff)] bg-[length:300%_100%] shadow-[0_1px_1px_0_rgba(65,132,234,0.75)]",
    danger:
      "bg-[linear-gradient(90deg,#ff7b7b,#ff1a1a,#ff7b7b,#ff1a1a)] bg-[length:300%_100%] shadow-[0_1px_1px_0_rgba(255,50,50,0.75)]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className || ""}`}
    >
      {children}
    </button>
  );
}
