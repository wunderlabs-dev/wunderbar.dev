/*
 * ABOUTME: Expand icon component for window expansion
 * ABOUTME: Pixel-style expand icon with consistent styling
 */

import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconExpandProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconExpand = ({ className, size = "inherit", ...props }: SvgIconExpandProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <polygon points="10.9,2.9 8.9,2.9 8.9,4.9 10.9,4.9 10.9,6.9 12.9,6.9 12.9,4.9 12.9,2.9" />
      <polygon points="4.9,8.9 2.9,8.9 2.9,10.9 2.9,12.9 4.9,12.9 6.9,12.9 6.9,10.9 4.9,10.9" />
    </SvgIcon>
  );
};

export default SvgIconExpand;
