"use client";

import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";

import type { HomePageCurtainButtonProps } from "./types";

import { useHomePageCurtain } from "@/context/home-page-curtain-context";

import { Button } from "@/components/ui/button";
import { SvgIconRobot } from "@/components/ui/svg-icon";

const HomePageCurtainButton = (props: HomePageCurtainButtonProps) => {
  const t = useTranslations();
  const { revealAgents } = useHomePageCurtain();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    revealAgents(event.detail ? event.clientX : undefined);
  };

  return (
    <Button
      type="button"
      variant="transparent"
      size="sm"
      startAdornment={<SvgIconRobot size="sm" className="text-current" />}
      onClick={handleClick}
      {...props}
    >
      {t("home.notAHuman")}
    </Button>
  );
};

export default HomePageCurtainButton;
