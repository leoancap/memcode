const lightTheme = {
  bg1: "#ffffff",
  bg2: "#f9f9f9",
  co1: "#000",
  co2: "#303030",
  bo1: "#e6e6e6",
  bo2: "rgba(0, 0, 0, 0.12) 0px 5px 10px",
}

const darkTheme = {
  bg1: "#000000",
  bg2: "#212121",
  co1: "#ffffff",
  co2: "#dfdfdf",
  bo1: "#767676",
  bo2: "rgb(51, 51, 51) 0px 0px 0px 1px",
}

export { darkTheme, lightTheme }
export type Theme = typeof darkTheme | typeof lightTheme
