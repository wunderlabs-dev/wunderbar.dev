/*
 * ABOUTME: Desktop window component
 * ABOUTME: Represents a window on the desktop
 */
import Link from "next/link";
import { useTranslations } from "next-intl";

import { EMAIL_ADDRESS } from "@/utils/const";

import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { SvgIconChat, SvgIconLogo } from "@/components/SvgIcon";

import { HomeWindowList } from "@/components/HomeWindowList";
import { HomeWindowDivider } from "@/components/HomeWindowDivider";
import { HomeWindowMarquee } from "@/components/HomeWindowMarquee";
import { HomeWindowToolbar } from "@/components/HomeWindowToolbar";

const HomeWindow = () => {
  const t = useTranslations();

  return (
    <div className="absolute left-64 top-16 bg-beige-100 outline outline-blue-400">
      <HomeWindowToolbar />

      <div className="flex flex-col w-xl gap-16 px-8 py-24">
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

          <Link href={EMAIL_ADDRESS}>
            <Button endAdornment={<SvgIconChat size="small" />}>
              <Typography variant="body2" uppercase>
                {t("toolbar.letsTalk")}
              </Typography>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeWindow;
