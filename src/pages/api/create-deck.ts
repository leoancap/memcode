import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "src/lib/prisma";

export default async function createDeck(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const deckData = JSON.parse(req.body);
  const session = await getSession({ req });
  if (!session?.user) return res.status(401).json({ message: "No permission" });
  const newDeck = await prisma.deck.create({
    data: {
      ...deckData,
      user: { connect: { email: session.user.email } },
    },
  });

  console.log({ newDeck });
  res.status(200).json(newDeck);
}
