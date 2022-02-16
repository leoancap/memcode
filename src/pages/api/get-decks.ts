import { prisma } from "src/lib/prisma";

export default async function getDecks(req, res) {
  const decks = await prisma.deck.findMany();

  res.status(200).json(decks);
}
