/*
 * ABOUTME: Flash/lightning icon component
 * ABOUTME: Pixel-style flash icon with consistent styling
 */

import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconFlashProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconFlash = ({ className, size = "inherit", ...props }: SvgIconFlashProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <rect x="11" y="9" width="2" height="2" />
      <rect x="3" y="5" width="2" height="2" />
      <polygon points="9,9 7,9 7,8 5,8 3,8 3,7 1,7 1,9 3,9 3,10 5,10 7,10 7,11 7,13 7,15 9,15 9,13 11,13 11,11 9,11" />
      <polygon points="13,7 13,6 11,6 9,6 9,5 9,3 9,1 7,1 7,3 5,3 5,5 7,5 7,7 9,7 9,8 11,8 13,8 13,9 15,9 15,7" />
    </SvgIcon>
  );
};

export default SvgIconFlash;
