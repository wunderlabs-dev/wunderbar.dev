/*
 * ABOUTME: Animation keyframes definitions
 * ABOUTME: Contains reusable animation keyframe sequences for framer-motion
 */

export const drop = {
  duration: 0,
};

export const windowClipPath = {
  initial: {
    clipPath: "inset(0% 0% 100% 0%)",
  },
  animate: {
    clipPath: [
      "inset(0% 0% 100% 0%)",
      "inset(0% 0% 100% 0%)",
      "inset(0% 0% 66% 0%)",
      "inset(0% 0% 66% 0%)",
      "inset(0% 0% 33% 0%)",
      "inset(0% 0% 33% 0%)",
      "inset(0% 0% 0% 0%)",
    ],
    transition: {
      duration: 0.15,
      times: [0, 0.33, 0.34, 0.5, 0.51, 0.84, 1],
    },
  },
  exit: {
    clipPath: [
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(33% 0% 0% 0%)",
      "inset(33% 0% 0% 0%)",
      "inset(66% 0% 0% 0%)",
      "inset(66% 0% 0% 0%)",
    ],
    transition: {
      duration: 0.15,
      times: [0, 0.33, 0.34, 0.66, 0.67, 1],
    },
  },
};

export const frameFadeIn = {
  viewport: {
    once: true,
  },
  variants: {
    hidden: {
      display: "block",
    },
    visible: {
      display: "none",
    },
  },
  transition: {
    duration: 0,
    delay: 1,
  },
};

export const frameClipPath = {
  variants: {
    hidden: {
      display: "none",
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      display: ["none", "block", "block"],
      clipPath: [
        "inset(0 0 100% 0)",
        "inset(0 0 100% 0)",
        "inset(0 0 92% 0)",
        "inset(0 0 92% 0)",
        "inset(0 0 87% 0)",
        "inset(0 0 87% 0)",
        "inset(0 0 87% 0)",
        "inset(0 0 78% 0)",
        "inset(0 0 78% 0)",
        "inset(0 0 71% 0)",
        "inset(0 0 71% 0)",
        "inset(0 0 71% 0)",
        "inset(0 0 71% 0)",
        "inset(0 0 63% 0)",
        "inset(0 0 58% 0)",
        "inset(0 0 58% 0)",
        "inset(0 0 58% 0)",
        "inset(0 0 49% 0)",
        "inset(0 0 49% 0)",
        "inset(0 0 42% 0)",
        "inset(0 0 42% 0)",
        "inset(0 0 42% 0)",
        "inset(0 0 35% 0)",
        "inset(0 0 35% 0)",
        "inset(0 0 35% 0)",
        "inset(0 0 35% 0)",
        "inset(0 0 28% 0)",
        "inset(0 0 28% 0)",
        "inset(0 0 21% 0)",
        "inset(0 0 21% 0)",
        "inset(0 0 21% 0)",
        "inset(0 0 14% 0)",
        "inset(0 0 14% 0)",
        "inset(0 0 14% 0)",
        "inset(0 0 7% 0)",
        "inset(0 0 7% 0)",
        "inset(0 0 0% 0)",
      ],
      transition: {
        delay: 1,
        duration: 12,
        times: [
          0, 0.03, 0.03, 0.08, 0.08, 0.12, 0.15, 0.15, 0.18, 0.18, 0.22, 0.27,
          0.32, 0.32, 0.35, 0.38, 0.41, 0.41, 0.44, 0.44, 0.5, 0.53, 0.53, 0.56,
          0.59, 0.65, 0.65, 0.7, 0.7, 0.73, 0.76, 0.76, 0.81, 0.84, 0.84, 0.91,
          1.0,
        ],
      },
    },
  },
};
