import type { ButtonProps } from "@/components/ui/button";

export type HomePageCurtainButtonProps = Omit<
  ButtonProps,
  "children" | "onClick" | "size" | "startAdornment" | "variant"
>;
