import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "src/lib/prisma";

export default async function createDeck(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { deckId, id } = JSON.parse(req.body);
  const session = await getSession({ req });
  console.log({ session });
  if (!session?.user) return res.status(401).json({ message: "No permission" });
  const deck = await prisma.deck.findFirst({
    where: { id: { equals: deckId } },
  });
  if (deck && deck.userId === session.userId) {
    const deletedExercise = await prisma.exercise.delete({
      where: {
        id,
      },
    });
    console.log({ deletedExercise });
    res.status(200).json(deletedExercise);
  } else {
    res.status(401).json({ message: "No permission" });
  }
}
