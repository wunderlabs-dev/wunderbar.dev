/*
 * ABOUTME: Window content component
 * ABOUTME: Contains the main content displayed inside the desktop window
 */
import Link from "next/link";
import { useTranslations } from "next-intl";

import { MAILTO_ADDRESS } from "@/utils/const";

import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { SvgIconChat, SvgIconLogo } from "@/components/SvgIcon";

import { HomeWindowList } from "@/components/HomeWindowList";
import { HomeWindowDivider } from "@/components/HomeWindowDivider";
import { HomeWindowMarquee } from "@/components/HomeWindowMarquee";

const HomeWindowContent = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-16 px-8 py-24 w-window h-window overflow-y-auto">
      <Link href="/">
        <SvgIconLogo className="w-44 mx-auto" />
      </Link>

      <Typography variant="title" className="text-center">
        {t("desktop.window.description")}
      </Typography>

      <div className="flex flex-col items-center gap-12 max-w-full">
        <HomeWindowMarquee />

        <div className="flex flex-col max-w-sm gap-24 mx-auto">
          <HomeWindowList />
          <HomeWindowDivider />
        </div>

        <Link href={MAILTO_ADDRESS}>
          <Button endAdornment={<SvgIconChat size="small" />}>
            <Typography variant="body2" uppercase>
              {t("toolbar.letsTalk")}
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeWindowContent;
