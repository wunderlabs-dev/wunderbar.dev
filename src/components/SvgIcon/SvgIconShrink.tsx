/*
 * ABOUTME: Shrink icon component for window shrinking
 * ABOUTME: Pixel-style shrink icon with consistent styling
 */

import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconShrinkProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconShrink = ({ className, size = "inherit", ...props }: SvgIconShrinkProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <polygon points="10.9,4.9 10.9,2.9 8.9,2.9 8.9,4.9 8.9,6.9 10.9,6.9 12.9,6.9 12.9,4.9" />
      <polygon points="2.9,8.9 2.9,10.9 4.9,10.9 4.9,12.9 6.9,12.9 6.9,10.9 6.9,8.9 4.9,8.9" />
    </SvgIcon>
  );
};

export default SvgIconShrink;
