export const ViewPort = {
  viewport: { once: true, amount: 0.5, margin: "20px" },
  whileInView: { y: 0, x: 0, scale: 1, opacity: 1 },
};
export const Animate = {
  animate: { y: 0, x: 0, scale: 1, opacity: 1 },
};
export const FadeUp = {
  initial: { y: 100, opacity: 0 },
  exit: { y: 100, opacity: 0 },
};
export const FadeDown = {
  initial: { y: -100, opacity: 0 },
  exit: { y: -100, opacity: 0 },
};
export const FadeRight = {
  initial: { x: 100, opacity: 0 },
  exit: { x: 100, opacity: 0 },
};
export const FadeLeft = {
  initial: { x: -100, opacity: 0 },
  exit: { x: -100, opacity: 0 },
};
export const Rotate_Scale_Tap = {
  whileTap: { rotateZ: -6, scale: 0.94, transition: { duration: 0.04 } },
};
export const opacity = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
};
export const opacityAllTime = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  // viewport:{margin: "50px"},
};
export const BlurAnimate = {
  initial: { scale: 0.8 },
  whileInView: { scale: 1 },
  viewport: { once: true, amount: 0.5 },
};
export const transition = {
  transition: { duration: 0.4 },
};
export const delay1 = {
  transition: { delay: 0.2 },
};
export const delay2 = {
  transition: { delay: 0.4 },
};
export const delay3 = {
  transition: { delay: 0.6 },
};
export const delay4 = {
  transition: { delay: 0.8 },
};
export const delay5 = {
  transition: { delay: 0.10 },
};
