import * as React from "react";
import Image from "next/image";

import logo from "public/logo.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { Link } from "src/components";
import { AppShell, Box, Header } from "@mantine/core";

import { User } from "@styled-icons/feather";

type LayoutProps = {
  navbar?: React.ReactElement;
};

export const Layout: React.FC<LayoutProps> = ({ children, navbar }) => {
  const session = useSession();

  return (
    <AppShell
      padding="md"
      {...(navbar && { navbar })}
      header={
        <Header
          style={{ display: "flex", justifyContent: "space-between" }}
          height={80}
          padding="sm"
          mx="lg"
        >
          <Link to="/">
            <span>
              <Image src={logo} alt="logo" width="48" height="48" />
            </span>
          </Link>
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
              <User
                onClick={() => signIn()}
                width={48}
                height={48}
                title={"Connect with Github"}
              />
            )}
          </div>
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
