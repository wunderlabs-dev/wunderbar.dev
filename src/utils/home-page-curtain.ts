import { isFunction, negate } from "es-toolkit";

import type { ElementImageWebGL2Context, LayoutSubtreeCanvas, LegacyTexElementImage2D } from "@/utils/html-in-canvas";

const CLOTH = {
  columns: 31,
  constraintPasses: 3,
  diagonalStiffness: 0.16,
  rows: 23,
  tearDistanceMultiplier: 6,
} as const;

const PHYSICS = {
  damping: 0.99,
  fixedTimeStep: 1 / 60,
  gravity: 1750,
  maxFrameDelta: 1 / 20,
  maxStepsPerFrame: 3,
  windFrequency: 0.0035,
  windStrength: 42,
  windVerticalFrequency: 0.012,
} as const;

const RELEASE = {
  horizontalImpulse: 150,
  horizontalVariation: 115,
  releaseDuration: 360,
  releaseVariation: 54,
  verticalImpulse: 18,
} as const;

const FOLDS = {
  broadCount: 6,
  broadSpeed: 0.0042,
  broadVerticalPhase: 2.4,
  fineCount: 12,
  fineSpeed: 0.003,
  fineStrength: 2.5,
  fineVerticalPhase: 1.7,
  horizontalBaseAmplitude: 6,
  horizontalVerticalAmplitude: 12,
  releaseDuration: 520,
  verticalBaseAmplitude: 3,
  verticalCount: 7,
  verticalSpeed: 0.0036,
  verticalStrength: 7,
  verticalVerticalPhase: 2,
} as const;

const SHADING = {
  maximum: 1.05,
  minimum: 0.92,
  movementStrength: 0.0012,
  slopeStrength: 0.13,
} as const;

const SHADOW = {
  offsetX: 10,
  offsetY: -18,
} as const;

const LIFECYCLE = {
  completionOffset: 120,
  safetyDuration: 3400,
  setupDuration: 800,
} as const;

const WEB_GL_CONTEXT_OPTIONS = {
  alpha: true,
  antialias: true,
  depth: false,
  premultipliedAlpha: true,
} as const;

const VERTEX_SHADER_SOURCE = `#version 300 es
  in vec2 aPosition;
  in vec2 aTextureCoordinate;
  in float aShade;

  uniform vec2 uOffset;
  uniform vec2 uResolution;

  out highp vec2 vTextureCoordinate;
  out highp float vShade;

  void main() {
    vec2 position = aPosition + uOffset;
    vec2 clipPosition = (position / uResolution) * 2.0 - 1.0;

    gl_Position = vec4(clipPosition.x, -clipPosition.y, 0.0, 1.0);
    vTextureCoordinate = aTextureCoordinate;
    vShade = aShade;
  }
`;

const FRAGMENT_SHADER_SOURCE = `#version 300 es
  precision highp float;

  in highp vec2 vTextureCoordinate;
  in highp float vShade;

  uniform sampler2D uTexture;
  uniform float uShadowPass;

  out vec4 outputColor;

  void main() {
    vec4 textureColor = texture(uTexture, vTextureCoordinate);

    if (uShadowPass > 0.5) {
      outputColor = vec4(0.03, 0.025, 0.02, textureColor.a * 0.32);
      return;
    }

    outputColor = vec4(textureColor.rgb * vShade, textureColor.a);
  }
`;

const not = negate((value: boolean) => value);

type Constraint = {
  active: boolean;
  firstPoint: number;
  restLength: number;
  secondPoint: number;
  stiffness: number;
};

type ClothMesh = {
  cellHeight: number;
  cellWidth: number;
  clickColumn: number;
  constraints: Constraint[];
  edgeConstraints: Map<string, Constraint>;
  pointCount: number;
  positions: Float32Array;
  previousPositions: Float32Array;
  releaseTimes: Float32Array;
  releasedColumns: Uint8Array;
  renderedPositions: Float32Array;
  shades: Float32Array;
  textureCoordinates: Float32Array;
};

type CurtainBuffers = {
  indices: WebGLBuffer;
  positions: WebGLBuffer;
  shades: WebGLBuffer;
  textureCoordinates: WebGLBuffer;
};

type CurtainRenderer = {
  buffers: CurtainBuffers;
  gl: ElementImageWebGL2Context;
  program: WebGLProgram;
  texture: WebGLTexture;
  uniforms: {
    offset: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    shadowPass: WebGLUniformLocation | null;
    texture: WebGLUniformLocation | null;
  };
  vertexArray: WebGLVertexArrayObject;
};

type CurtainRuntime = {
  animationFrame: number;
  disposed: boolean;
  physicsAccumulator: number;
  previousTime: number;
  renderer: CurtainRenderer | null;
  safetyTimeout: number;
  setupTimeout: number;
  started: boolean;
  startTime: number;
};

type WebGlCurtainOptions = {
  canvas: HTMLCanvasElement;
  clickX: number;
  height: number;
  onComplete: () => void;
  onFailure: () => void;
  onReady: () => void;
  source: HTMLElement;
  width: number;
};

const getEdgeKey = (firstPoint: number, secondPoint: number) => {
  return firstPoint < secondPoint ? `${firstPoint}:${secondPoint}` : `${secondPoint}:${firstPoint}`;
};

const getDeterministicVariation = (index: number) => {
  const value = Math.sin(index * 91.173 + 17.71) * 43758.5453;
  return value - Math.floor(value);
};

const addConstraint = (mesh: ClothMesh, firstPoint: number, secondPoint: number, restLength: number, stiffness = 1) => {
  const constraint = { active: true, firstPoint, restLength, secondPoint, stiffness };
  mesh.constraints.push(constraint);
  mesh.edgeConstraints.set(getEdgeKey(firstPoint, secondPoint), constraint);
};

const createClothMesh = (width: number, height: number, clickX: number): ClothMesh => {
  const pointCount = CLOTH.columns * CLOTH.rows;
  const cellWidth = width / (CLOTH.columns - 1);
  const cellHeight = height / (CLOTH.rows - 1);
  const clampedClickX = Math.min(Math.max(clickX, 0), width);
  const mesh: ClothMesh = {
    cellHeight,
    cellWidth,
    clickColumn: (clampedClickX / width) * (CLOTH.columns - 1),
    constraints: [],
    edgeConstraints: new Map(),
    pointCount,
    positions: new Float32Array(pointCount * 2),
    previousPositions: new Float32Array(pointCount * 2),
    releaseTimes: new Float32Array(CLOTH.columns),
    releasedColumns: new Uint8Array(CLOTH.columns),
    renderedPositions: new Float32Array(pointCount * 2),
    shades: new Float32Array(pointCount),
    textureCoordinates: new Float32Array(pointCount * 2),
  };

  for (let row = 0; row < CLOTH.rows; row += 1) {
    for (let column = 0; column < CLOTH.columns; column += 1) {
      const point = row * CLOTH.columns + column;
      const positionIndex = point * 2;
      const x = column * cellWidth;
      const y = row * cellHeight;

      mesh.positions[positionIndex] = x;
      mesh.positions[positionIndex + 1] = y;
      mesh.previousPositions[positionIndex] = x;
      mesh.previousPositions[positionIndex + 1] = y;
      mesh.textureCoordinates[positionIndex] = column / (CLOTH.columns - 1);
      mesh.textureCoordinates[positionIndex + 1] = 1 - row / (CLOTH.rows - 1);
      mesh.shades[point] = 1;

      if (column < CLOTH.columns - 1) {
        addConstraint(mesh, point, point + 1, cellWidth);
      }

      if (row < CLOTH.rows - 1) {
        addConstraint(mesh, point, point + CLOTH.columns, cellHeight);
      }

      if (column < CLOTH.columns - 1 && row < CLOTH.rows - 1) {
        const diagonalLength = Math.hypot(cellWidth, cellHeight);
        addConstraint(mesh, point, point + CLOTH.columns + 1, diagonalLength, CLOTH.diagonalStiffness);
        addConstraint(mesh, point + 1, point + CLOTH.columns, diagonalLength, CLOTH.diagonalStiffness);
      }
    }
  }

  for (let column = 0; column < CLOTH.columns; column += 1) {
    const distanceFromClick = Math.abs(column - mesh.clickColumn) / (CLOTH.columns - 1);
    mesh.releaseTimes[column] =
      distanceFromClick * RELEASE.releaseDuration + getDeterministicVariation(column) * RELEASE.releaseVariation;
  }

  return mesh;
};

const isPointPinned = (mesh: ClothMesh, point: number, elapsed: number) => {
  return point < CLOTH.columns && elapsed < mesh.releaseTimes[point];
};

const integratePoints = (mesh: ClothMesh, elapsed: number, deltaTime: number) => {
  for (let point = 0; point < mesh.pointCount; point += 1) {
    const positionIndex = point * 2;
    const column = point % CLOTH.columns;

    if (isPointPinned(mesh, point, elapsed)) {
      const pinnedX = column * mesh.cellWidth;
      mesh.positions[positionIndex] = pinnedX;
      mesh.positions[positionIndex + 1] = 0;
      mesh.previousPositions[positionIndex] = pinnedX;
      mesh.previousPositions[positionIndex + 1] = 0;
      continue;
    }

    if (point < CLOTH.columns && mesh.releasedColumns[column] === 0) {
      const variation = getDeterministicVariation(column + 37);
      const direction = column < mesh.clickColumn ? -1 : 1;
      const impulse = direction * (RELEASE.horizontalImpulse + variation * RELEASE.horizontalVariation);
      mesh.previousPositions[positionIndex] = mesh.positions[positionIndex] - impulse * deltaTime;
      mesh.previousPositions[positionIndex + 1] =
        mesh.positions[positionIndex + 1] - variation * RELEASE.verticalImpulse * deltaTime;
      mesh.releasedColumns[column] = 1;
    }

    const x = mesh.positions[positionIndex];
    const y = mesh.positions[positionIndex + 1];
    const velocityX = (x - mesh.previousPositions[positionIndex]) * PHYSICS.damping;
    const velocityY = (y - mesh.previousPositions[positionIndex + 1]) * PHYSICS.damping;
    const wind = Math.sin(elapsed * PHYSICS.windFrequency + y * PHYSICS.windVerticalFrequency) * PHYSICS.windStrength;

    mesh.previousPositions[positionIndex] = x;
    mesh.previousPositions[positionIndex + 1] = y;
    mesh.positions[positionIndex] = x + velocityX + wind * deltaTime * deltaTime;
    mesh.positions[positionIndex + 1] = y + velocityY + PHYSICS.gravity * deltaTime * deltaTime;
  }
};

const solveConstraints = (mesh: ClothMesh, elapsed: number) => {
  for (let pass = 0; pass < CLOTH.constraintPasses; pass += 1) {
    for (const constraint of mesh.constraints) {
      if (not(constraint.active)) {
        continue;
      }

      const firstPositionIndex = constraint.firstPoint * 2;
      const secondPositionIndex = constraint.secondPoint * 2;
      const deltaX = mesh.positions[secondPositionIndex] - mesh.positions[firstPositionIndex];
      const deltaY = mesh.positions[secondPositionIndex + 1] - mesh.positions[firstPositionIndex + 1];
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > constraint.restLength * CLOTH.tearDistanceMultiplier) {
        constraint.active = false;
        continue;
      }

      if (distance === 0) {
        continue;
      }

      const firstPointPinned = isPointPinned(mesh, constraint.firstPoint, elapsed);
      const secondPointPinned = isPointPinned(mesh, constraint.secondPoint, elapsed);

      if (firstPointPinned && secondPointPinned) {
        continue;
      }

      const difference = (distance - constraint.restLength) / distance;
      const firstPointWeight = firstPointPinned ? 0 : secondPointPinned ? 1 : 0.5;
      const secondPointWeight = secondPointPinned ? 0 : firstPointPinned ? 1 : 0.5;
      const correctionX = deltaX * difference * constraint.stiffness;
      const correctionY = deltaY * difference * constraint.stiffness;

      mesh.positions[firstPositionIndex] += correctionX * firstPointWeight;
      mesh.positions[firstPositionIndex + 1] += correctionY * firstPointWeight;
      mesh.positions[secondPositionIndex] -= correctionX * secondPointWeight;
      mesh.positions[secondPositionIndex + 1] -= correctionY * secondPointWeight;
    }
  }
};

const isEdgeActive = (mesh: ClothMesh, firstPoint: number, secondPoint: number) => {
  return mesh.edgeConstraints.get(getEdgeKey(firstPoint, secondPoint))?.active ?? false;
};

const createVisibleIndices = (mesh: ClothMesh) => {
  const indices: number[] = [];

  for (let row = 0; row < CLOTH.rows - 1; row += 1) {
    for (let column = 0; column < CLOTH.columns - 1; column += 1) {
      const topLeft = row * CLOTH.columns + column;
      const topRight = topLeft + 1;
      const bottomLeft = topLeft + CLOTH.columns;
      const bottomRight = bottomLeft + 1;

      if (
        isEdgeActive(mesh, topLeft, bottomLeft) &&
        isEdgeActive(mesh, bottomLeft, bottomRight) &&
        isEdgeActive(mesh, topLeft, bottomRight)
      ) {
        indices.push(topLeft, bottomLeft, bottomRight);
      }

      if (
        isEdgeActive(mesh, topLeft, bottomRight) &&
        isEdgeActive(mesh, bottomRight, topRight) &&
        isEdgeActive(mesh, topRight, topLeft)
      ) {
        indices.push(topLeft, bottomRight, topRight);
      }
    }
  }

  return new Uint16Array(indices);
};

const updateRenderedPositions = (mesh: ClothMesh, elapsed: number) => {
  for (let row = 0; row < CLOTH.rows; row += 1) {
    for (let column = 0; column < CLOTH.columns; column += 1) {
      const point = row * CLOTH.columns + column;
      const positionIndex = point * 2;
      const horizontalRatio = column / (CLOTH.columns - 1);
      const verticalRatio = row / (CLOTH.rows - 1);
      const releaseProgress = Math.min(Math.max((elapsed - mesh.releaseTimes[column]) / FOLDS.releaseDuration, 0), 1);
      const smoothRelease = releaseProgress * releaseProgress * (3 - 2 * releaseProgress);
      const broadFold = Math.sin(
        horizontalRatio * Math.PI * FOLDS.broadCount +
          verticalRatio * FOLDS.broadVerticalPhase +
          elapsed * FOLDS.broadSpeed,
      );
      const fineFold = Math.sin(
        horizontalRatio * Math.PI * FOLDS.fineCount -
          verticalRatio * FOLDS.fineVerticalPhase -
          elapsed * FOLDS.fineSpeed,
      );
      const verticalFold = Math.cos(
        horizontalRatio * Math.PI * FOLDS.verticalCount -
          verticalRatio * FOLDS.verticalVerticalPhase +
          elapsed * FOLDS.verticalSpeed,
      );
      const horizontalAmplitude = FOLDS.horizontalBaseAmplitude + verticalRatio * FOLDS.horizontalVerticalAmplitude;
      const verticalAmplitude = FOLDS.verticalBaseAmplitude + verticalRatio * FOLDS.verticalStrength;

      mesh.renderedPositions[positionIndex] =
        mesh.positions[positionIndex] +
        (broadFold * horizontalAmplitude + fineFold * FOLDS.fineStrength) * smoothRelease;
      mesh.renderedPositions[positionIndex + 1] =
        mesh.positions[positionIndex + 1] + verticalFold * verticalAmplitude * smoothRelease;
    }
  }
};

const updateShades = (mesh: ClothMesh) => {
  for (let row = 0; row < CLOTH.rows; row += 1) {
    for (let column = 0; column < CLOTH.columns; column += 1) {
      const point = row * CLOTH.columns + column;
      const leftColumn = Math.max(column - 1, 0);
      const rightColumn = Math.min(column + 1, CLOTH.columns - 1);
      const leftY = mesh.renderedPositions[(row * CLOTH.columns + leftColumn) * 2 + 1];
      const rightY = mesh.renderedPositions[(row * CLOTH.columns + rightColumn) * 2 + 1];
      const slope = (rightY - leftY) / Math.max((rightColumn - leftColumn) * mesh.cellWidth, 1);
      const movement = Math.abs(mesh.renderedPositions[point * 2] - mesh.previousPositions[point * 2]);
      mesh.shades[point] = Math.min(
        Math.max(1 + slope * SHADING.slopeStrength - movement * SHADING.movementStrength, SHADING.minimum),
        SHADING.maximum,
      );
    }
  }
};

const advancePhysics = (mesh: ClothMesh, elapsed: number, frameDelta: number, accumulator: number) => {
  let nextAccumulator = accumulator + frameDelta;
  let physicsSteps = 0;

  while (nextAccumulator >= PHYSICS.fixedTimeStep && physicsSteps < PHYSICS.maxStepsPerFrame) {
    integratePoints(mesh, elapsed, PHYSICS.fixedTimeStep);
    solveConstraints(mesh, elapsed);
    nextAccumulator -= PHYSICS.fixedTimeStep;
    physicsSteps += 1;
  }

  return nextAccumulator;
};

const getTopEdge = (mesh: ClothMesh) => {
  let topEdge = Number.POSITIVE_INFINITY;

  for (let point = 0; point < mesh.pointCount; point += 1) {
    topEdge = Math.min(topEdge, mesh.positions[point * 2 + 1]);
  }

  return topEdge;
};

const compileShader = (gl: WebGL2RenderingContext, type: number, source: string): WebGLShader => {
  const shader = gl.createShader(type);

  if (shader === null) {
    throw new Error("Unable to create curtain shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const isCompiled = Boolean(gl.getShaderParameter(shader, gl.COMPILE_STATUS));

  if (not(isCompiled)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unable to compile curtain shader.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
};

const createShaderProgram = (gl: WebGL2RenderingContext) => {
  const shaders: WebGLShader[] = [];
  let program: WebGLProgram | null = null;
  let isLinked = false;

  try {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    shaders.push(vertexShader);

    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    shaders.push(fragmentShader);

    program = gl.createProgram();

    if (program === null) {
      throw new Error("Unable to create curtain shader program.");
    }

    for (const shader of shaders) {
      gl.attachShader(program, shader);
    }

    gl.linkProgram(program);

    isLinked = Boolean(gl.getProgramParameter(program, gl.LINK_STATUS));

    if (not(isLinked)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Unable to link curtain shader program.");
    }

    return program;
  } catch (error) {
    gl.deleteProgram(program);
    throw error;
  } finally {
    for (const shader of shaders) {
      if (program !== null && isLinked) {
        gl.detachShader(program, shader);
      }

      gl.deleteShader(shader);
    }
  }
};

const createBuffer = (gl: WebGL2RenderingContext) => {
  const buffer = gl.createBuffer();

  if (buffer === null) {
    throw new Error("Unable to create curtain buffer.");
  }

  return buffer;
};

const uploadElementTexture = (gl: ElementImageWebGL2Context, source: HTMLElement, width: number, height: number) => {
  if (isFunction(gl.texElementImage2D)) {
    try {
      gl.texElementImage2D(gl.TEXTURE_2D, gl.RGBA8, source, { height, width });
      return;
    } catch {
      const legacyTexElementImage2D = gl.texElementImage2D as unknown as LegacyTexElementImage2D;
      legacyTexElementImage2D.call(gl, gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      return;
    }
  }

  if (isFunction(gl.texElement2D)) {
    gl.texElement2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    return;
  }

  throw new Error("HTML element textures are not available in WebGL.");
};

const getElementImageContext = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext("webgl2", WEB_GL_CONTEXT_OPTIONS) as ElementImageWebGL2Context | null;

  if (gl === null) {
    throw new Error("Unable to create a WebGL 2 context.");
  }

  const supportsElementTextures = isFunction(gl.texElementImage2D) || isFunction(gl.texElement2D);

  if (not(supportsElementTextures)) {
    throw new Error("HTML element textures are not available in WebGL.");
  }

  return gl;
};

const bindFloatAttribute = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
  buffer: WebGLBuffer,
  data: Float32Array,
  size: number,
  usage: number,
) => {
  const location = gl.getAttribLocation(program, name);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
};

const configureElementTexture = (
  gl: ElementImageWebGL2Context,
  texture: WebGLTexture,
  source: HTMLElement,
  width: number,
  height: number,
) => {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  uploadElementTexture(gl, source, width, height);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
};

const destroyRenderer = (renderer: CurtainRenderer) => {
  const { gl } = renderer;

  for (const buffer of Object.values(renderer.buffers)) {
    gl.deleteBuffer(buffer);
  }

  gl.deleteTexture(renderer.texture);
  gl.deleteVertexArray(renderer.vertexArray);
  gl.deleteProgram(renderer.program);
};

const createCurtainRenderer = (canvas: HTMLCanvasElement, source: HTMLElement, mesh: ClothMesh): CurtainRenderer => {
  const gl = getElementImageContext(canvas);
  const allocatedBuffers: WebGLBuffer[] = [];
  let program: WebGLProgram | null = null;
  let vertexArray: WebGLVertexArrayObject | null = null;
  let texture: WebGLTexture | null = null;

  try {
    program = createShaderProgram(gl);
    vertexArray = gl.createVertexArray();
    texture = gl.createTexture();

    if (vertexArray === null || texture === null) {
      throw new Error("Unable to create curtain WebGL resources.");
    }

    const allocateBuffer = () => {
      const buffer = createBuffer(gl);
      allocatedBuffers.push(buffer);
      return buffer;
    };
    const buffers: CurtainBuffers = {
      indices: allocateBuffer(),
      positions: allocateBuffer(),
      shades: allocateBuffer(),
      textureCoordinates: allocateBuffer(),
    };

    gl.bindVertexArray(vertexArray);
    gl.useProgram(program);
    bindFloatAttribute(gl, program, "aPosition", buffers.positions, mesh.positions, 2, gl.DYNAMIC_DRAW);
    bindFloatAttribute(
      gl,
      program,
      "aTextureCoordinate",
      buffers.textureCoordinates,
      mesh.textureCoordinates,
      2,
      gl.STATIC_DRAW,
    );
    bindFloatAttribute(gl, program, "aShade", buffers.shades, mesh.shades, 1, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    configureElementTexture(gl, texture, source, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return {
      buffers,
      gl,
      program,
      texture,
      uniforms: {
        offset: gl.getUniformLocation(program, "uOffset"),
        resolution: gl.getUniformLocation(program, "uResolution"),
        shadowPass: gl.getUniformLocation(program, "uShadowPass"),
        texture: gl.getUniformLocation(program, "uTexture"),
      },
      vertexArray,
    };
  } catch (error) {
    for (const buffer of allocatedBuffers) {
      gl.deleteBuffer(buffer);
    }

    gl.deleteTexture(texture);
    gl.deleteVertexArray(vertexArray);
    gl.deleteProgram(program);

    throw error;
  }
};

const renderCurtain = (renderer: CurtainRenderer, mesh: ClothMesh, width: number, height: number, elapsed: number) => {
  const { buffers, gl, program, uniforms } = renderer;
  const visibleIndices = createVisibleIndices(mesh);

  updateRenderedPositions(mesh, elapsed);
  updateShades(mesh);

  gl.bindVertexArray(renderer.vertexArray);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.renderedPositions, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.shades);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.shades, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, visibleIndices, gl.DYNAMIC_DRAW);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.uniform2f(uniforms.resolution, width, height);
  gl.uniform1i(uniforms.texture, 0);

  gl.uniform2f(uniforms.offset, SHADOW.offsetX, SHADOW.offsetY);
  gl.uniform1f(uniforms.shadowPass, 1);
  gl.drawElements(gl.TRIANGLES, visibleIndices.length, gl.UNSIGNED_SHORT, 0);

  gl.uniform2f(uniforms.offset, 0, 0);
  gl.uniform1f(uniforms.shadowPass, 0);
  gl.drawElements(gl.TRIANGLES, visibleIndices.length, gl.UNSIGNED_SHORT, 0);
};

const startWebGlCurtain = ({
  canvas,
  clickX,
  height,
  onComplete,
  onFailure,
  onReady,
  source,
  width,
}: WebGlCurtainOptions) => {
  const experimentalCanvas = canvas as LayoutSubtreeCanvas;
  const mesh = createClothMesh(width, height, clickX);
  const runtime: CurtainRuntime = {
    animationFrame: 0,
    disposed: false,
    physicsAccumulator: 0,
    previousTime: 0,
    renderer: null,
    safetyTimeout: 0,
    setupTimeout: 0,
    started: false,
    startTime: 0,
  };

  function removeListeners() {
    canvas.removeEventListener("paint", begin);
    canvas.removeEventListener("webglcontextlost", handleContextLost);
  }

  function clearScheduledWork() {
    cancelAnimationFrame(runtime.animationFrame);
    window.clearTimeout(runtime.safetyTimeout);
    window.clearTimeout(runtime.setupTimeout);
  }

  function dispose() {
    if (runtime.disposed) {
      return;
    }

    runtime.disposed = true;
    clearScheduledWork();
    removeListeners();

    if (runtime.renderer !== null) {
      destroyRenderer(runtime.renderer);
      runtime.renderer = null;
    }
  }

  function settle(callback: () => void) {
    if (runtime.disposed) {
      return;
    }

    dispose();
    callback();
  }

  function complete() {
    settle(onComplete);
  }

  function fail() {
    settle(onFailure);
  }

  function renderFrame(time: number) {
    if (runtime.disposed || runtime.renderer === null) {
      return;
    }

    const elapsed = time - runtime.startTime;
    const frameDelta = Math.min(Math.max((time - runtime.previousTime) / 1000, 0), PHYSICS.maxFrameDelta);
    runtime.previousTime = time;
    runtime.physicsAccumulator = advancePhysics(mesh, elapsed, frameDelta, runtime.physicsAccumulator);

    renderCurtain(runtime.renderer, mesh, width, height, elapsed);

    if (getTopEdge(mesh) > height + LIFECYCLE.completionOffset) {
      complete();
      return;
    }

    runtime.animationFrame = requestAnimationFrame(renderFrame);
  }

  function begin() {
    if (runtime.disposed || runtime.started) {
      return;
    }

    runtime.started = true;
    window.clearTimeout(runtime.setupTimeout);

    try {
      runtime.renderer = createCurtainRenderer(canvas, source, mesh);
      runtime.startTime = performance.now();
      runtime.previousTime = runtime.startTime;
      runtime.physicsAccumulator = PHYSICS.fixedTimeStep;

      renderCurtain(runtime.renderer, mesh, width, height, 0);
      onReady();

      runtime.safetyTimeout = window.setTimeout(complete, LIFECYCLE.safetyDuration);
      runtime.animationFrame = requestAnimationFrame(renderFrame);
    } catch {
      fail();
    }
  }

  function handleContextLost(event: Event) {
    event.preventDefault();
    fail();
  }

  canvas.addEventListener("paint", begin);
  canvas.addEventListener("webglcontextlost", handleContextLost);
  runtime.setupTimeout = window.setTimeout(fail, LIFECYCLE.setupDuration);

  try {
    experimentalCanvas.requestPaint?.();
  } catch {
    fail();
  }

  return dispose;
};

export { startWebGlCurtain };
