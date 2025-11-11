/*
 * ABOUTME: Minimize icon component for window minimization to taskbar
 * ABOUTME: Pixel-style minimize icon with consistent styling
 */

import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconMinimizeProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconMinimize = ({ className, size = "inherit", ...props }: SvgIconMinimizeProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <polygon points="10.9,10.9 8.9,10.9 6.9,10.9 4.9,10.9 2.9,10.9 2.9,12.9 4.9,12.9 6.9,12.9 8.9,12.9 10.9,12.9 12.9,12.9 12.9,10.9" />
    </SvgIcon>
  );
};

export default SvgIconMinimize;
