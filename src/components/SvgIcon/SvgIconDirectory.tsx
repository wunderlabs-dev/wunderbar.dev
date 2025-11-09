import { HTMLAttributes } from "react";

import { cn } from "@/utils/helpers";

import type { SvgIconSize, SvgIconSizeMapping } from "@/components/SvgIcon";

type SvgIconDirectoryProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const svgIconSizeClassNames: SvgIconSizeMapping = {
  inherit: "size-auto",
  small: "w-4 h-4",
  medium: "w-6 h-6",
  large: "w-8 h-8",
};

const SvgIconDirectory = ({
  className,
  size = "inherit",
  ...props
}: SvgIconDirectoryProps) => {
  return (
    <svg
      viewBox="0 0 64 52"
      fill="currentColor"
      className={cn(className, svgIconSizeClassNames[size])}
      {...props}
    >
      <g>
        <rect x="60" y="44" width="2" height="2" />
        <rect x="58" y="46" width="2" height="2" />
        <rect x="56" y="48" width="2" height="2" />
        <polygon points="52,50 50,50 48,50 46,50 44,50 42,50 40,50 38,50 36,50 34,50 32,50 30,50 28,50 26,50 24,50 22,50 20,50 18,50 16,50 14,50 12,50 10,50 8,50 8,52 10,52 12,52 14,52 16,52 18,52 20,52 22,52 24,52 26,52 28,52 30,52 32,52 34,52 36,52 38,52 40,52 42,52 44,52 46,52 48,52 50,52 52,52 54,52 56,52 56,50 54,50" />
        <rect x="6" y="48" width="2" height="2" />
        <rect x="4" y="46" width="2" height="2" />
        <rect x="2" y="44" width="2" height="2" />
        <polygon points="2,40 2,38 2,36 2,34 2,32 2,30 2,28 2,26 2,24 2,22 2,20 2,18 2,16 2,14 2,12 2,10 4,10 6,10 8,10 10,10 12,10 14,10 16,10 18,10 20,10 22,10 24,10 26,10 28,10 30,10 32,10 34,10 36,10 38,10 40,10 42,10 44,10 46,10 48,10 50,10 52,10 54,10 56,10 58,10 58,8 56,8 54,8 52,8 50,8 48,8 46,8 44,8 42,8 40,8 40,6 38,6 38,8 36,8 34,8 32,8 30,8 28,8 26,8 24,8 22,8 20,8 18,8 16,8 14,8 12,8 10,8 8,8 6,8 4,8 4,6 2,6 2,8 0,8 0,10 0,12 0,14 0,16 0,18 0,20 0,22 0,24 0,26 0,28 0,30 0,32 0,34 0,36 0,38 0,40 0,42 0,44 2,44 2,42" />
        <rect x="4" y="4" width="2" height="2" />
        <rect x="6" y="2" width="2" height="2" />
        <polygon points="12,2 14,2 16,2 18,2 20,2 22,2 24,2 26,2 28,2 30,2 32,2 34,2 34,0 32,0 30,0 28,0 26,0 24,0 22,0 20,0 18,0 16,0 14,0 12,0 10,0 8,0 8,2 10,2" />
        <rect x="34" y="2" width="2" height="2" />
        <rect x="36" y="4" width="2" height="2" />
        <rect x="58" y="10" width="2" height="2" />
        <polygon points="62,12 60,12 60,14 62,14 62,16 62,18 62,20 62,22 62,24 62,26 62,28 62,30 62,32 62,34 62,36 62,38 62,40 62,42 62,44 64,44 64,42 64,40 64,38 64,36 64,34 64,32 64,30 64,28 64,26 64,24 64,22 64,20 64,18 64,16 64,14 64,12" />
      </g>
    </svg>
  );
};

export default SvgIconDirectory;
