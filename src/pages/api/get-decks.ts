import { prisma } from "src/lib/prisma";

export async function getDecks() {
  return await prisma.deck.findMany();
}

export default async function handler(req, res) {
  const decks = await getDecks();

  res.status(200).json(decks);
}
