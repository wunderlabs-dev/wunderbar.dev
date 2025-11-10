/*
 * ABOUTME: Desktop folder component
 * ABOUTME: Represents a folder on the desktop
 */

import { useRef } from "react";
import { useHover } from "usehooks-ts";
import { useTranslations } from "next-intl";

import { Typography } from "@/components/Typography";
import { SvgIconFolder, SvgIconFolderOpen } from "@/components/SvgIcon";

const HomeDesktopFolder = () => {
  const t = useTranslations("desktop.folder");

  const ref = useRef<HTMLDivElement>(null as never);
  const hover = useHover<HTMLDivElement>(ref);

  return (
    <div className="flex flex-col items-center justify-center gap-1 py-1 px-2 cursor-pointer" ref={ref}>
      {hover ? <SvgIconFolderOpen size="large" /> : <SvgIconFolder size="large" />}

      <Typography variant="body2" uppercase>
        {t("wunder")}
      </Typography>
    </div>
  );
};

export default HomeDesktopFolder;
