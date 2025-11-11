/*
 * ABOUTME: Star icon component
 * ABOUTME: Pixel-style star icon with consistent styling
 */

import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconStarProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconStar = ({ className, size = "inherit", ...props }: SvgIconStarProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <path d="M8.9,12.9h-2v-2h-2v-2h-2v-2h2v-2h2v-2h2v2h2v2h2v2h-2v2h-2V12.9z" />
    </SvgIcon>
  );
};

export default SvgIconStar;
