
// Page transition animations
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

// Card animations
export const cardAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  })
};

// List item animations
export const listItemAnimation = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  })
};

// Button hover animation
export const buttonHoverAnimation = {
  scale: 1.02,
  y: -2,
  transition: { duration: 0.2 }
};

// Icon animations
export const iconAnimation = {
  hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } }
};

// Loading spinner animation
export const spinnerAnimation = {
  animate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity, ease: 'linear' }
};
