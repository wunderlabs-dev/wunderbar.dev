/*
 * ABOUTME: Desktop window list component
 * ABOUTME: Container for list items in a desktop window
 */

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Typography } from "@/components/Typography";
import { SvgIconFlash, SvgIconLamp, SvgIconTools } from "@/components/SvgIcon";

import { HomeWindowFrame } from "@/components/HomeWindowFrame";
import { HomeWindowListItem } from "@/components/HomeWindowListItem";

const HomeWindowList = () => {
  const t = useTranslations();

  const renderers = {
    animation: (chunks: ReactNode) => <span>{chunks}</span>,
  };

  return (
    <div className="flex flex-col gap-6">
      <HomeWindowListItem startAdornment={<SvgIconLamp size="small" />}>
        <Typography variant="body2" uppercase>
          {t("desktop.window.everyoneShouldShipIdeas")}
        </Typography>
        <Typography variant="body2" color="muted">
          {t("desktop.window.notWaitForSprints")}
        </Typography>
      </HomeWindowListItem>

      <HomeWindowListItem startAdornment={<SvgIconFlash size="small" />}>
        <Typography variant="body2" uppercase>
          {t.rich("desktop.window.twoWeeksAnIdea", renderers)}
        </Typography>
        <HomeWindowFrame />
      </HomeWindowListItem>

      <HomeWindowListItem startAdornment={<SvgIconTools size="small" />}>
        <Typography variant="body2" uppercase>
          {t("desktop.window.weAreBuildingTools")}
        </Typography>
        <Typography variant="body2" color="muted">
          {t("desktop.window.thatLetYouPrototype")}
        </Typography>
      </HomeWindowListItem>
    </div>
  );
};

export default HomeWindowList;
