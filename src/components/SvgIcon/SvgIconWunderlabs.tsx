import { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconWunderlabsProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconWunderlabs = ({ className, size = "inherit", ...props }: SvgIconWunderlabsProps) => {
  return (
    <SvgIcon className={className} size={size} viewBox="0 0 30 14" {...props}>
      <path d="M6.51074 3.37305H9.7832L8.43359 5.56641H7.67383L9.7832 9.54492L14.8438 0H19.5664L12.1445 14H7.42188L0 0H4.72266L6.51074 3.37305ZM22.5781 14H17.8555L15.8311 10.458H19.7324L23.4883 3.37305H28.2119L22.5781 14ZM28.5244 2.7832H23.8018L25.2773 0H30L28.5244 2.7832Z" />
    </SvgIcon>
  );
};

export default SvgIconWunderlabs;
