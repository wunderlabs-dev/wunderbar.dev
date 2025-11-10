export type TypographyVariant = "body1" | "body2" | "caption" | "title";

export type TypographyVariantMapping = {
  [key in TypographyVariant]: string;
};

export type TypographyColor = "inherit" | "muted";

export type TypographyColorMapping = {
  [key in TypographyColor]: string;
};
