const commonTheme = {
  fz1: "calc(1rem + 1vmin)",
  fz2: "calc(1.1rem + 1.1vmin)",
  fz3: "calc(1.2rem + 1.2vmin)",
  fz4: "calc(1.3rem + 1.3vmin)",
}
const lightTheme = {
  ...commonTheme,
  bg1: "#FCFAF2",
  bg2: "#2B3647",
  bg3: "#FDBF2C",
  bg4: "#Fff",
  co1: "#333333",
  co2: "#FFFFFF",
  co3: "#646464",
  co4: "#111",
  bo1: "#e6e6e6",
}

const darkTheme = {
  ...commonTheme,
  bg1: "#2F3129",
  bg2: "#333",
  bg3: "#555",
  bg4: "#444",
  co1: "#eee",
  co2: "#C7C7C7",
  co3: "#C7C7C7",
  co4: "#EDEDED",
  bo1: "#767676",
}

export { darkTheme, lightTheme }
export type Theme = typeof darkTheme | typeof lightTheme
