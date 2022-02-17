import { prisma } from "src/lib/prisma";

export async function getDeck(deckId: string) {
  return await prisma.deck.findFirst({
    where: { id: { equals: deckId as string } },
    include: { exercises: true },
  });
}

export default async function handler(req, res) {
  const { deckId } = JSON.parse(req.body);

  const deck = await getDeck(deckId);

  res.status(200).json(deck);
}
