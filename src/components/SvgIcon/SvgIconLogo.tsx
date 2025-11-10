/*
 * ABOUTME: Logo icon component
 * ABOUTME: Wunderlabs logo with digit style
 */

import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconLogoProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconLogo = ({
  className,
  size = "inherit",
  ...props
}: SvgIconLogoProps) => {
  return (
    <SvgIcon className={className} size={size} viewBox="0 0 176 106" {...props}>
      <path d="M176 0h-27.3l-8.6 16.1h27.4zM85.9 0 56.6 55.2l-12.2-23h4.4l7.8-12.7H37.7L27.3 0H0l42.9 81h27.4l42.9-81zM116.6 60.5H94L105.7 81h27.4l32.6-61.5h-27.4zM11.3 90.2v8.4h-.7v1.4H9.2v-1.4h-.7v-9.8H5.6v9.8h-.7v1.4H3.5v-1.4h-.7v-9.8H0V100h.7v1.4h.7v1.4h.7v1.4h.7v1.4h2.8v-1.4h.7v-1.4h1.4v1.4h.7v1.4h2.8v-1.4h.7v-1.4h.7v-1.4h.8V100h.7V88.8h-2.8v1.4zM28.9 90.2V102.8H26V88.8h-2.8V104.2h1.4v1.4H30.2v-1.4h1.4V88.8h-2.8v1.4zM48.6 90.2V97.2h-.7v-1.4h-.7v-1.4h-.7V93h-.7v-1.4h-1.4v-2.8h-2.8v16.8h2.8v-8.4h.6v1.4h.7v1.4h.7v1.4h.7v1.4h1.4v2.8h2.9V88.8h-2.8v1.4zM68.3 89.2v-.4h-7.1v16.8H68.2v-1.4h1.4V90.2h-1.4v-1zm-2.9 13.7H64V91.7h2.8V102.8h-1.4zM83.7 88.8H79.5v16.8H86.5v-2.8H82.3v-4.2h4.2v-2.8H82.3v-4.2h4.2v-2.8h-2.8zM102.7 89.2v-.4h-7v16.8H98.4V100h.7v1.4h.7v1.4h.7v1.4h.7v1.4h2.8v-2.8h-.7v-1.4h-.7v-2.8h1.4v-8.4h-1.4v-1zm-4.2 7v-4.6h2.8V97.2h-2.8v-1zM117.5 102.9h-1.4V88.9h-2.8v16.8H120.3v-2.8h-2.8zM137.2 92v-.4h-.7v-1.4h-.7v-1.4H131.6v1.4h-.7v1.4h-.7V93h-.7V105.6h2.8v-4.2h2.8v4.2h2.8V93h-.7v-1zm-3.6 6.6h-1.4v-4.2h.7V93h1.4v1.4h.7v4.2h-1.4zM154.7 89.2v-.4h-7v16.8H154.7v-1.4h1.4V90.2h-1.4v-1zm-3.2 2.4H153.3v4.2h-2.8v-4.2h1zm.4 11.3h-1.4v-4.2h2.8v4.2h-1.4zM173 89.2v-.4h-5.6v1.4H166V95.8h1.4v1.4h1.4v1.4h1.4v1.4h1.4v2.8h-2.8v-4.2H166V104.2h1.4v1.4H173v-1.4h1.4V98.6H173v-1.4h-1.4v-1.4h-1.4v-1.4h-1.4v-2.8h2.8v2.8h2.8v-4.2H173v-1z" />{" "}
    </SvgIcon>
  );
};

export default SvgIconLogo;
