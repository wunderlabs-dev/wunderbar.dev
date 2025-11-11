import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconFolderXsProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconFolderXs = ({ className, size = "inherit", ...props }: SvgIconFolderXsProps) => {
  return (
    <SvgIcon className={className} size={size} viewBox="0 0 16 16" {...props}>
      <path d="M14 13v2H2v-2h12ZM10 3h6v10h-2V5H4v2H2v6H0V3h2v2h2V3H2V1h8v2Z" />
    </SvgIcon>
  );
};

export default SvgIconFolderXs;
