/*
 * ABOUTME: Lamp icon component
 * ABOUTME: Pixel-style lamp icon with consistent styling
 */

import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconLampProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconLamp = ({ className, size = "inherit", ...props }: SvgIconLampProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <polygon points="9,0 7,0 5,0 5,2 7,2 9,2 11,2 11,0" />
      <polygon points="3,4 3,6 3,8 4,8 4,10 6,10 6,8 5,8 5,6 5,4 5,2 3,2" />
      <polygon points="11,2 11,4 11,6 11,8 10,8 10,10 12,10 12,8 13,8 13,6 13,4 13,2" />
      <polygon points="8,12 8,13 10,13 10,11 8,11 8,10 6,10 6,12" />
      <polygon points="6,15 8,15 8,16 10,16 10,14 8,14 8,13 6,13" />
      <polygon points="7,6 7,8 9,8 9,6 9,4 7,4" />
    </SvgIcon>
  );
};

export default SvgIconLamp;
