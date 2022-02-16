import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "src/lib/prisma";

export default async function updateExercise(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { deckId, id, ...newExerciseData } = JSON.parse(req.body);
  const session = await getSession({ req });
  if (!session?.user) return res.status(401).json({ message: "No permission" });
  const updatedExercise = await prisma.exercise.update({
    data: newExerciseData,
    where: {
      id,
    },
  });

  // console.log({ updatedExercise });
  res.status(200).json(updatedExercise);
}
