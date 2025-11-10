import { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconFolderXsProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconFolderXs = ({ className, size = "inherit", ...props }: SvgIconFolderXsProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <path d="M14 13V15H2V13H14ZM2 9H4V7H14V5H10V3H16V13H14V9H4V11H2V13H0V3H2V9ZM10 3H2V1H10V3Z" />
    </SvgIcon>
  );
};

export default SvgIconFolderXs;
