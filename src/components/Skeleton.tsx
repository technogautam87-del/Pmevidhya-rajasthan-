import React from "react";
import { useAccessibility } from "./AccessibilityCtx";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", variant = "rectangular" }) => {
  const { highContrast } = useAccessibility();

  const variantClass = 
    variant === "circular" 
      ? "rounded-full" 
      : variant === "text" 
        ? "rounded h-4 w-3/4" 
        : "rounded-2xl";

  const colorClass = highContrast
    ? "bg-slate-900 border border-yellow-300 animate-pulse"
    : "bg-slate-200/70 border border-slate-300/40 animate-pulse";

  return (
    <div 
      className={`relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent ${
        highContrast 
          ? "before:to-yellow-500/10" 
          : "before:to-white/20"
      } before:to-transparent ${variantClass} ${colorClass} ${className}`}
      style={{
        backgroundSize: "200% 100%",
      }}
    />
  );
};
