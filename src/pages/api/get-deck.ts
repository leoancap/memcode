import { prisma } from "src/lib/prisma";

export default async function getDecks(req, res) {
  const { deckId } = JSON.parse(req.body);

  const deck = await prisma.deck.findFirst({
    where: { id: { equals: deckId as string } },
    include: { exercises: true },
  });

  res.status(200).json(deck);
}
