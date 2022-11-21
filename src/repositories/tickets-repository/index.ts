import { prisma } from "@/config";

export default async function findManyTicketTypes() {
  return prisma.ticketType.findMany();
}
