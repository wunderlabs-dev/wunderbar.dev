/*
 * ABOUTME: X icon component for close buttons and dismissal actions
 * ABOUTME: Pixel-style X icon with consistent styling
 */

import { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconXProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconX = ({ className, size = "inherit", ...props }: SvgIconXProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <rect x="10.9" y="10.9" width="2" height="2" />
      <rect x="2.9" y="2.9" width="2" height="2" />
      <rect x="10.9" y="2.9" width="2" height="2" />
      <rect x="2.9" y="10.9" width="2" height="2" />
      <rect x="4.9" y="4.9" width="2" height="2" />
      <rect x="8.9" y="8.9" width="2" height="2" />
      <rect x="4.9" y="8.9" width="2" height="2" />
      <rect x="6.9" y="6.9" width="2" height="2" />
      <rect x="8.9" y="4.9" width="2" height="2" />
    </SvgIcon>
  );
};

export default SvgIconX;
