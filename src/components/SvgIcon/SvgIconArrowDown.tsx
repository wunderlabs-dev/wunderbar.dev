import { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconArrowDownProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconArrowDown = ({ className, size = "inherit", ...props }: SvgIconArrowDownProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <path d="M8 12L12 8H9V4H7V8H4L8 12Z" />
    </SvgIcon>
  );
};

export default SvgIconArrowDown;
