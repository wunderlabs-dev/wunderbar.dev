/*
 * ABOUTME: Window toolbar component
 * ABOUTME: Contains window controls (expand, minimize, close)
 */
import { useTranslations } from "next-intl";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { SvgIconX, SvgIconExpand, SvgIconMinimize } from "@/components/SvgIcon";

import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";

type HomeWindowToolbarProps = {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
} & React.HTMLAttributes<HTMLDivElement>;

const HomeWindowToolbar = ({ listeners, attributes, ...props }: HomeWindowToolbarProps) => {
  const t = useTranslations();

  return (
    <div
      {...props}
      {...listeners}
      {...attributes}
      className="flex items-center justify-between pl-3 pr-1 py-1 bg-beige-200 outline outline-blue-400 cursor-grab"
    >
      <Typography variant="caption" uppercase>
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
  );
};

export default HomeWindowToolbar;
