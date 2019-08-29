import React from "react"
import LinkNext from "next/link"

interface ILink {
  to: string
  children: React.ReactChild
  prefetch?: boolean
}

export default function Link({ prefetch = true, to, children }: ILink) {
  return (
    <LinkNext prefetch={prefetch} href={to} as={to}>
      <span
        style={{
          cursor: "pointer",
        }}
      >
        {children}
      </span>
    </LinkNext>
  )
}
