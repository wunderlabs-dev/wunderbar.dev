/*
 * ABOUTME: Typography component for consistent text styling
 * ABOUTME: Supports body1, body2, caption, and title variants with color options
 */

import React, { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/utils/helpers";

import type {
  TypographyVariant,
  TypographyVariantMapping,
  TypographyColor,
  TypographyColorMapping,
} from "@/components/Typography";

export type TypographyProps = {
  children: ReactNode;
  color?: TypographyColor;
  variant?: TypographyVariant;
  uppercase?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className">;

const typographyVariantMapping: TypographyVariantMapping = {
  title: "h2",
  body1: "span",
  body2: "span",
  caption: "span",
};

const typographyVariantClassNames: TypographyVariantMapping = {
  body1: "text-base leading-5 font-space-grotesk",
  body2: "text-xs leading-4 font-space-grotesk",
  caption: "text-xs leading-4 font-handjet font-light tracking-widest",
  title: "text-2xl font-normal font-handjet",
};

const typographyColorClassNames: TypographyColorMapping = {
  inherit: "text-inherit",
  muted: "text-blue-700",
};

const Typography = ({
  variant = "body1",
  color = "inherit",
  uppercase = false,
  className,
  children,
  ...props
}: TypographyProps) => {
  const Component = typographyVariantMapping[variant] as React.ElementType;

  return (
    <Component
      className={cn(
        typographyVariantClassNames[variant],
        typographyColorClassNames[color],
        uppercase ? "uppercase" : null,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
