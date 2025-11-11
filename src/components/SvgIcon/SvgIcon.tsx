import type { ReactNode, HTMLAttributes } from "react";

import { cn } from "@/utils/helpers";

import type { SvgIconSize, SvgIconSizeMapping } from "@/components/SvgIcon";

export type SvgIconProps = {
  children: ReactNode;
  size?: SvgIconSize;
  viewBox?: string;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const svgIconSizeClassNames: SvgIconSizeMapping = {
  inherit: "size-auto",
  small: "w-4 h-4",
  medium: "w-6 h-6",
  large: "w-16 h-16",
} as const;

const SvgIcon = ({ children, className, size = "inherit", viewBox = "0 0 16 16", ...props }: SvgIconProps) => {
  return (
    <svg viewBox={viewBox} fill="currentColor" className={cn(svgIconSizeClassNames[size], className)} {...props}>
      {children}
    </svg>
  );
};

export default SvgIcon;
