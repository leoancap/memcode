import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorageValue } from "@mantine/hooks";
import React from "react";
import { ConfigProvider } from "src/utils/ConfigContext";

export default function Main({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

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
      <ConfigProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: colorScheme === "dark" ? "dark" : "light",
            }}
          >
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ConfigProvider>
    </>
  );
}
