/*
 * ABOUTME: Button component for user interactions
 * ABOUTME: Simple button with customizable styling and adornments
 */

import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/utils/helpers";

import { type ButtonVariant } from "@/components/Button";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = "default", startAdornment, endAdornment, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center cursor-pointer",
        variant === "default" ? "border border-blue-900" : "border-0",
        variant === "default" ? "hover:bg-blue-900 hover:text-white" : null,
        className
      )}
      {...props}
    >
      {startAdornment ? <div className="px-2 py-2">{startAdornment}</div> : null}
      <span className={cn(variant === "default" ? "px-3" : null)}>{children}</span>
      {endAdornment ? <div className="px-2 py-2">{endAdornment}</div> : null}
    </button>
  );
};

export default Button;
