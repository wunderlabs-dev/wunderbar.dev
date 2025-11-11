import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconFolderOpenProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconFolderOpen = ({ className, size = "inherit", ...props }: SvgIconFolderOpenProps) => {
  return (
    <SvgIcon className={className} size={size} viewBox="0 0 64 64" {...props}>
      <g>
        <rect x="60" y="50" width="2" height="2" />
        <rect x="58" y="52" width="2" height="2" />
        <rect x="56" y="54" width="2" height="2" />
        <polygon points="52,56 50,56 48,56 46,56 44,56 42,56 40,56 38,56 36,56 34,56 32,56 30,56 28,56 26,56 24,56 22,56 20,56 18,56 16,56 14,56 12,56 10,56 8,56 8,58 10,58 12,58 14,58 16,58 18,58 20,58 22,58 24,58 26,58 28,58 30,58 32,58 34,58 36,58 38,58 40,58 42,58 44,58 46,58 48,58 50,58 52,58 54,58 56,58 56,56 54,56" />
        <rect x="6" y="54" width="2" height="2" />
        <rect x="4" y="52" width="2" height="2" />
        <rect x="2" y="50" width="2" height="2" />
        <polygon points="2,46 2,44 2,42 4,42 4,40 2,40 2,38 2,36 2,34 2,32 2,30 2,28 2,26 2,24 2,22 2,20 2,18 2,16 2,14 0,14 0,16 0,18 0,20 0,22 0,24 0,26 0,28 0,30 0,32 0,34 0,36 0,38 0,40 0,42 0,44 0,46 0,48 0,50 2,50 2,48" />
        <rect x="14" y="28" width="2" height="2" />
        <rect x="12" y="30" width="2" height="2" />
        <rect x="10" y="32" width="2" height="2" />
        <rect x="8" y="34" width="2" height="2" />
        <rect x="6" y="36" width="2" height="2" />
        <rect x="4" y="38" width="2" height="2" />
        <polygon points="56,26 54,26 52,26 50,26 48,26 46,26 44,26 42,26 40,26 38,26 36,26 34,26 32,26 30,26 28,26 26,26 24,26 22,26 20,26 18,26 16,26 16,28 18,28 20,28 22,28 24,28 26,28 28,28 30,28 32,28 34,28 36,28 38,28 40,28 42,28 44,28 46,28 48,28 50,28 52,28 54,28 56,28 58,28 58,26" />
        <rect x="58" y="28" width="2" height="2" />
        <rect x="2" y="12" width="2" height="2" />
        <rect x="4" y="10" width="2" height="2" />
        <rect x="6" y="8" width="2" height="2" />
        <polygon points="12,8 14,8 16,8 18,8 20,8 22,8 24,8 26,8 28,8 30,8 32,8 34,8 34,6 32,6 30,6 28,6 26,6 24,6 22,6 20,6 18,6 16,6 14,6 12,6 10,6 8,6 8,8 10,8" />
        <rect x="34" y="8" width="2" height="2" />
        <rect x="36" y="10" width="2" height="2" />
        <rect x="38" y="12" width="2" height="2" />
        <polygon points="42,16 44,16 46,16 48,16 50,16 52,16 54,16 56,16 58,16 58,14 56,14 54,14 52,14 50,14 48,14 46,14 44,14 42,14 40,14 40,16" />
        <rect x="58" y="16" width="2" height="2" />
        <polygon points="62,18 60,18 60,20 62,20 62,22 62,24 62,26 62,28 62,30 60,30 60,32 62,32 62,34 62,36 62,38 62,40 62,42 62,44 62,46 62,48 62,50 64,50 64,48 64,46 64,44 64,42 64,40 64,38 64,36 64,34 64,32 64,30 64,28 64,26 64,24 64,22 64,20 64,18" />
      </g>
    </SvgIcon>
  );
};

export default SvgIconFolderOpen;
