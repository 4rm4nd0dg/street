import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "neon" | "orange" | "black" | "white" | "concrete";
  rotate?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "neon",
  rotate = false,
  className = "",
}: BadgeProps) {
  const variantStyles = {
    neon: "bg-[#E6FF00] text-[#0A0A0A]",
    orange: "bg-[#FF4D00] text-white",
    black: "bg-[#0A0A0A] text-[#F5F2EA]",
    white: "bg-[#FFFFFF] text-[#0A0A0A]",
    concrete: "bg-[#8A8A8A] text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider border-2 border-black brutal-shadow-sm select-none ${
        variantStyles[variant]
      } ${rotate ? "-rotate-2" : ""} ${className}`}
    >
      {children}
    </span>
  );
}
