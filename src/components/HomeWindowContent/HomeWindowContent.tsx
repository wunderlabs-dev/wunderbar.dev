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
    <div className="flex flex-col gap-12 overflow-y-auto px-4 py-12 md:gap-16 md:px-8 md:py-24">
      <Link href="/">
        <SvgIconLogo className="mx-auto w-44" />
      </Link>

      <Typography variant="title" className="text-center">
        {t("desktop.window.description")}
      </Typography>

      <div className="flex max-w-full flex-col items-center gap-12">
        <HomeWindowMarquee />

        <div className="mx-auto flex max-w-sm flex-col gap-12 md:gap-24">
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
