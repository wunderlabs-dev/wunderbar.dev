import type { HTMLAttributes } from "react";

import { SvgIcon, type SvgIconSize } from "@/components/SvgIcon";

type SvgIconWunderlabsProps = {
  size?: SvgIconSize;
  className?: HTMLAttributes<SVGSVGElement>["className"];
} & HTMLAttributes<SVGSVGElement>;

const SvgIconWunderlabs = ({
  className,
  size = "inherit",
  ...props
}: SvgIconWunderlabsProps) => {
  return (
    <SvgIcon className={className} size={size} viewBox="0 0 30 14" {...props}>
      <path d="M6.51 3.373h3.273l-1.35 2.193h-.76l2.11 3.979L14.843 0h4.723l-7.421 14H7.422L0 0h4.723L6.51 3.373ZM22.579 14h-4.723l-2.024-3.542h3.901l3.756-7.085h4.724L22.578 14Zm5.946-11.217h-4.722L25.277 0H30l-1.476 2.783Z" />
    </SvgIcon>
  );
};

export default SvgIconWunderlabs;
