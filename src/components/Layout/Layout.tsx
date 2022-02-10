import * as React from "react";
import Image from "next/image";

import logo from "public/logo.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { Link } from "src/components";
import {
  ActionIcon,
  AppShell,
  Box,
  ColorScheme,
  Group,
  Header,
  useMantineColorScheme,
} from "@mantine/core";

import { PersonIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";

type LayoutProps = {
  navbar?: React.ReactElement;
};

export const Layout: React.FC<LayoutProps> = ({ children, navbar }) => {
  const session = useSession();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <AppShell
      {...(navbar && { navbar })}
      header={
        <Header height={80} padding="sm" mx="md">
          <Group position="apart" direction="row" align="center">
            <Link to="/">
              <span>
                <Image src={logo} alt="logo" width="48" height="48" />
              </span>
            </Link>
            <Group direction="row">
              <ActionIcon onClick={() => toggleColorScheme()}>
                {isDark ? (
                  <SunIcon height={40} width={40} />
                ) : (
                  <MoonIcon height={40} width={40} />
                )}
              </ActionIcon>
              <div>
                {session.status === "authenticated" ? (
                  <img
                    src={session.data.user.image}
                    title="Disconnect"
                    alt="avatar"
                    onClick={() => signOut()}
                    style={{ width: "48px", height: "48px" }}
                  />
                ) : (
                  <div title="Connect with Github">
                    <PersonIcon
                      onClick={() => signIn()}
                      width={48}
                      height={48}
                    />
                  </div>
                )}
              </div>
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Box sx={{ height: "100vh" }}>{children}</Box>
    </AppShell>
  );
};
