import { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconFrameProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconFrame = ({ className, size = "inherit", ...props }: SvgIconFrameProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <rect x="3.3" y="11.3" fill="#090D56" width="1.3" height="1.3" />
      <rect x="10" y="10" fill="#090D56" width="1.3" height="1.3" />
      <rect x="9.3" y="3.3" fill="#090D56" width="1.3" height="1.3" />
      <rect x="8" y="4.7" fill="#090D56" width="1.3" height="1.3" />
      <rect x="9.3" y="6" fill="#090D56" width="1.3" height="1.3" />
      <rect x="10.7" y="4.7" fill="#090D56" width="1.3" height="1.3" />
      <rect x="11.3" y="11.3" fill="#090D56" width="1.3" height="1.3" />
      <rect x="6" y="8.7" fill="#090D56" width="1.3" height="1.3" />
      <rect x="8.7" y="11.3" fill="#090D56" width="1.3" height="1.3" />
      <rect x="7.3" y="10" fill="#090D56" width="1.3" height="1.3" />
      <rect x="4.7" y="10" fill="#090D56" width="1.3" height="1.3" />
      <polygon points="14.7,1.3 14.7,14.7 1.3,14.7 1.3,1.3 14.7,1.3 14.7,0 1.3,0 0,0 0,1.3 0,14.7 0,16 1.3,16 14.7,16 16,16 16,14.7 16,1.3" />
    </SvgIcon>
  );
};

export default SvgIconFrame;
