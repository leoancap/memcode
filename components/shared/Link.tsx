import React from "react"
import LinkNext from "next/link"
/** @jsx jsx */
import { jsx, css } from "@emotion/core"

interface ILink {
  to: string
  children: React.ReactChild
  prefetch?: boolean
}

export default function Link({ prefetch = false, to, children }: ILink) {
  return (
    <LinkNext prefetch={prefetch} href={to}>
      <a
        css={css`
          /* color: yellow; */
          cursor: pointer;
        `}
      >
        {children}
      </a>
    </LinkNext>
  )
}
