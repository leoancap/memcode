import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "src/lib/prisma";

export default async function createDeck(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { deckId, exerciseId } = JSON.parse(req.body);
  console.log({ exerciseId });
  const session = await getSession({ req });
  if (!session?.user) return res.status(401).json({ message: "No permission" });
  // const deletedExercise = { exerciseId, deckId };
  const deletedExercise = await prisma.exercise.deleteMany({
    where: {
      id: {
        equals: exerciseId,
      },
      deckId: { equals: deckId },
      user: { email: { equals: session.user.email } },
    },
  });

  console.log({ deletedExercise });
  res.status(200).json(deletedExercise);
}
