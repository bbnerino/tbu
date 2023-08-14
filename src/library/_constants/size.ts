const ICON_SIZE_VARIANTS = {
  sm: {
    height: "20px",
    width: "20px",
  },
  md: {
    height: "25px",
    width: "25px",
  },
  lg: {
    height: "30px",
    width: "30px",
  },
};

export type SizeType = keyof typeof ICON_SIZE_VARIANTS;

export default ICON_SIZE_VARIANTS;
