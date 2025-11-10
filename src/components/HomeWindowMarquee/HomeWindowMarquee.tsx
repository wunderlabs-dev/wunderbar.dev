/*
 * ABOUTME: Desktop window marquee component
 * ABOUTME: Scrolling text marquee with decorative star icons
 */

import { useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";

import { MARQUEE_ITEMS } from "@/utils/const";

import { Typography } from "@/components/Typography";
import { SvgIconStar } from "@/components/SvgIcon";

const HomeWindowMarquee = () => {
  const t = useTranslations();

  return (
    <div className="relative w-full border-y border-y-blue-400 py-1">
      <SvgIconStar size="small" className="absolute left-0 top-1/2 -translate-y-1/2" />
      <SvgIconStar size="small" className="absolute right-0 top-1/2 -translate-y-1/2" />

      <Marquee pauseOnHover>
        {Array.from({ length: MARQUEE_ITEMS }).map((_, index) => (
          <Typography variant="body1" className="px-2" uppercase key={index}>
            {t("desktop.window.whyWeBuild")}
          </Typography>
        ))}
      </Marquee>
    </div>
  );
};

export default HomeWindowMarquee;
