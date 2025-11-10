/*
 * ABOUTME: Window toolbar component
 * ABOUTME: Contains window controls (expand, minimize, close)
 */
import { useTranslations } from "next-intl";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { useWindowState } from "@/contexts/WindowProvider";

import { SvgIconX, SvgIconExpand, SvgIconMinimize, SvgIconShrink } from "@/components/SvgIcon";

import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";

type HomeWindowToolbarProps = {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
} & React.HTMLAttributes<HTMLDivElement>;

const HomeWindowToolbar = ({ listeners, attributes }: HomeWindowToolbarProps) => {
  const t = useTranslations();

  const { size, setState, setSize } = useWindowState();

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSizeClick = () => {
    if (size === "DEFAULT") {
      setSize("ENLARGED");
    } else {
      setSize("DEFAULT");
    }
  };

  return (
    <div
      {...listeners}
      {...attributes}
      className="flex items-center justify-between pl-3 pr-1 py-1 bg-beige-200 outline outline-blue-400 cursor-grab"
    >
      <Typography variant="caption" uppercase>
        {t("desktop.window.title")}
      </Typography>

      <div className="flex items-center gap-1" onPointerDown={handlePointerDown}>
        <Button variant="transparent" onClick={handleSizeClick}>
          {size === "DEFAULT" ? <SvgIconExpand size="small" /> : <SvgIconShrink size="small" />}
        </Button>
        <Button variant="transparent" onClick={() => setState("CLOSED")}>
          <SvgIconMinimize size="small" />
        </Button>
        <Button variant="transparent" onClick={() => setState("CLOSED")}>
          <SvgIconX size="small" />
        </Button>
      </div>
    </div>
  );
};

export default HomeWindowToolbar;
