import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconArrowUpProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconArrowUp = ({ className, size = "inherit", ...props }: SvgIconArrowUpProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <path d="M8 4L4 8H7V12H9V8H12L8 4Z" />
    </SvgIcon>
  );
};

export default SvgIconArrowUp;
