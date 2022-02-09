import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "src/styled";
import { GlobalStyles } from "src/styled/global";
import { darkTheme, lightTheme } from "src/styled/themes/base";

export default function main({ Component, pageProps }) {
  const isDark = false;

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </>
    </ThemeProvider>
  );
}
