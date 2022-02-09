import React from "react";
import LinkNext from "next/link";

interface ILink {
  to: string;
  children: React.ReactChild;
  prefetch?: boolean;
}

export function Link({ to, children }: ILink) {
  return (
    <LinkNext href={to} as={to}>
      <span
        style={{
          cursor: "pointer",
        }}
      >
        {children}
      </span>
    </LinkNext>
  );
}
