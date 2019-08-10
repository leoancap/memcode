import { createGlobalStyle } from "."

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Malgun Gothic", "Segoe UI",
      Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";
  }

  html {
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${props => props.theme.co1};
    background-color: ${props => props.theme.bg1};
  }

  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
  }

  a {
    /* text-decoration: none; */
  }
`
