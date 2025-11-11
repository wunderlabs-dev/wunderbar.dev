/*
 * ABOUTME: Tools icon component
 * ABOUTME: Pixel-style tools icon with consistent styling
 */

import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconToolsProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconTools = ({ className, size = "inherit", ...props }: SvgIconToolsProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <polygon points="8,3 10,3 10,1 8,1 6,1 4,1 4,3 6,3" />
      <rect x="12" y="5" width="2" height="2" />
      <polygon points="4,3 2,3 2,5 2,7 4,7 4,5" />
      <rect x="10" y="3" width="2" height="2" />
      <polygon points="8,7 6,7 4,7 4,9 6,9 6,11 6,13 6,15 8,15 8,13 8,11 8,9 10,9 12,9 12,7 10,7" />
    </SvgIcon>
  );
};

export default SvgIconTools;
