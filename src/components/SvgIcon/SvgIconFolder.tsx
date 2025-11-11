import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconFolderProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconFolder = ({ className, size = "inherit", ...props }: SvgIconFolderProps) => {
  return (
    <SvgIcon className={className} size={size} {...props}>
      <path d="M15 12.5h.5v.5H15zM14.5 13h.5v.5h-.5zM14 13.5h.5v.5H14zM13 14H2v.5h12V14h-.5zM1.5 13.5H2v.5h-.5zM1 13h.5v.5H1zM.5 12.5H1v.5H.5zM.5 11.5V4h14v-.5H10V3h-.5v.5H1V3H.5v.5H0v9h.5V12zM1 2.5h.5V3H1zM1.5 2H2v.5h-.5zM3 2h5.5v-.5H2V2h.5zM8.5 2H9v.5h-.5zM9 2.5h.5V3H9zM14.5 4h.5v.5h-.5zM15.5 4.5H15V5h.5v7.5h.5v-8z" />
    </SvgIcon>
  );
};

export default SvgIconFolder;
