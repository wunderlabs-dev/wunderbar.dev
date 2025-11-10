import { useTranslations } from "next-intl";

import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { SvgIconWunderlabs, SvgIconChat, SvgIconFolderXs } from "@/components/SvgIcon";

import { HomeToolbarClock } from "@/components/HomeToolbar";

const HomeToolbar = () => {
  const t = useTranslations();

  return (
    <footer className="bg-beige-200 outline outline-blue-900 grid grid-cols-12 items-center px-4">
      <div className="col-span-3">
        <SvgIconWunderlabs className="w-8" />
      </div>

      <div className="col-span-6 flex justify-center">
        <Button startAdornment={<SvgIconFolderXs size="small" />} className="border-y-0 border-r-0">
          <Typography variant="body2" uppercase>
            {t("desktop.folder.wunder")}
          </Typography>
        </Button>
        <Button endAdornment={<SvgIconChat size="small" />} className="border-y-0">
          <Typography variant="body2" uppercase>
            {t("toolbar.letsTalk")}
          </Typography>
        </Button>
      </div>

      <div className="col-span-3 flex justify-end">
        <HomeToolbarClock />
      </div>
    </footer>
  );
};

export default HomeToolbar;
