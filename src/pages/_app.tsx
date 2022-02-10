import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ThemeProvider } from "src/styled";
import { GlobalStyles } from "src/styled/global";
import { darkTheme, lightTheme } from "src/styled/themes/base";
import { MantineProvider } from "@mantine/core";

export default function main({ Component, pageProps }) {
  const isDark = false;

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <>
      <Head>
        <title>Memcode</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: isDark ? "dark" : "light",
          }}
        >
          <GlobalStyles />
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </MantineProvider>
      </ThemeProvider>
    </>
  );
}
