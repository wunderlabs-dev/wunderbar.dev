import Link from "next/link";
import { useTranslations } from "next-intl";

import { MAILTO_ADDRESS } from "@/utils/const";
import { useWindowState } from "@/contexts/WindowProvider";

import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { SvgIconWunderlabs, SvgIconChat, SvgIconFolderXs, SvgIconFolderOpenXs } from "@/components/SvgIcon";

import { HomeToolbarClock } from "@/components/HomeToolbar";

const HomeToolbar = () => {
  const t = useTranslations();

  const { state, setState } = useWindowState();

  const startAdornment = state === "OPEN" ? <SvgIconFolderOpenXs size="small" /> : <SvgIconFolderXs size="small" />;

  return (
    <footer className="bg-beige-200 grid grid-cols-12 items-center border border-t-blue-900 px-4">
      <div className="col-span-3">
        <SvgIconWunderlabs className="w-8" />
      </div>

      <div className="col-span-6 flex justify-center">
        <Button startAdornment={startAdornment} className="border-y-0 border-r-0" onClick={() => setState("OPEN")}>
          <Typography variant="body2" uppercase>
            {t("desktop.folder.wunder")}
          </Typography>
        </Button>
        <Link href={MAILTO_ADDRESS}>
          <Button endAdornment={<SvgIconChat size="small" />} className="border-y-0">
            <Typography variant="body2" uppercase>
              {t("toolbar.letsTalk")}
            </Typography>
          </Button>
        </Link>
      </div>

      <div className="col-span-3 flex justify-end">
        <HomeToolbarClock />
      </div>
    </footer>
  );
};

export default HomeToolbar;
