/*
 * ABOUTME: Desktop window marquee component
 * ABOUTME: Scrolling text marquee with decorative star icons
 */

import { useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";

import { MARQUEE_ITEMS } from "@/utils/const";

import { SvgIconStar } from "@/components/SvgIcon";
import { Typography } from "@/components/Typography";

const HomeWindowMarquee = () => {
  const t = useTranslations();

  return (
    <div className="relative w-full border-y border-y-blue-400 py-1">
      <SvgIconStar size="small" className="absolute top-1/2 left-0 -translate-y-1/2" />
      <SvgIconStar size="small" className="absolute top-1/2 right-0 -translate-y-1/2" />

      <Marquee pauseOnHover>
        {Array.from({ length: MARQUEE_ITEMS }).map((_, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Typography variant="body1" className="px-2" uppercase>
              {t("desktop.window.whyWeBuild")}
            </Typography>
            <Typography variant="body1" className="px-2" uppercase>
              {t("desktop.window.title")}
            </Typography>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default HomeWindowMarquee;
