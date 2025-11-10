/*
 * ABOUTME: Desktop window component
 * ABOUTME: Represents a window on the desktop
 */
import { useTranslations } from "next-intl";

import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { SvgIconX, SvgIconExpand, SvgIconMinimize } from "@/components/SvgIcon";

const HomeDesktopWindow = () => {
  const t = useTranslations();

  return (
    <div className="absolute left-1/2 top-1/2 bg-beige-100 outline outline-blue-400">
      <div className="flex items-center justify-between px-1 py-1 bg-beige-200 outline outline-blue-400 cursor-grab active:cursor-grabbing">
        <Typography variant="body2" uppercase>
          {t("desktop.window.title")}
        </Typography>

        <div className="flex items-center gap-1">
          <Button variant="transparent">
            <SvgIconExpand size="small" />
          </Button>
          <Button variant="transparent">
            <SvgIconMinimize size="small" />
          </Button>
          <Button variant="transparent">
            <SvgIconX size="small" />
          </Button>
        </div>
      </div>

      <div className="px-8 py-24"></div>
    </div>
  );
};

export default HomeDesktopWindow;
