type WebGLCopyElementImageConfig = {
  height?: number;
  sheight?: number;
  swidth?: number;
  sx?: number;
  sy?: number;
  width?: number;
};

type DrawElementImage = (element: Element, dx: number, dy: number, dwidth?: number, dheight?: number) => DOMMatrix;

type LegacyTexElement2D = (
  target: number,
  level: number,
  internalFormat: number,
  format: number,
  type: number,
  element: Element,
) => void;

type LegacyTexElementImage2D = LegacyTexElement2D;

type TexElementImage2D = (
  target: number,
  internalFormat: number,
  element: Element,
  config?: WebGLCopyElementImageConfig,
) => void;

type LayoutSubtreeCanvas = HTMLCanvasElement & {
  layoutSubtree?: boolean;
  requestPaint?: () => void;
};

type DrawElementImageContext = CanvasRenderingContext2D & {
  drawElement?: DrawElementImage;
  drawElementImage?: DrawElementImage;
};

type ElementImageWebGL2Context = WebGL2RenderingContext & {
  texElement2D?: LegacyTexElement2D;
  texElementImage2D?: TexElementImage2D;
};

export type { DrawElementImageContext, ElementImageWebGL2Context, LegacyTexElementImage2D, LayoutSubtreeCanvas };
