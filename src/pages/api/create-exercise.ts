import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "src/lib/prisma";

export default async function createDeck(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { deckId, ...exerciseData } = JSON.parse(req.body);
  console.log({ exerciseData });
  const session = await getSession({ req });
  if (!session?.user) return res.status(401).json({ message: "No permission" });
  const newExercise = await prisma.exercise.create({
    data: {
      deck: { connect: { id: deckId } },
      user: { connect: { email: session.user.email } },
      ...exerciseData,
    },
  });

  console.log({ newExercise });
  res.status(200).json(newExercise);
}
