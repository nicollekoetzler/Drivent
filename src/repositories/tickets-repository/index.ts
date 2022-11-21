import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findManyTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findFirstUserTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

async function createTicket( ticketTypeId: number, enrollmentId: number ) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED
    }
  });
}

const ticketsRepository = {
  findManyTicketTypes,
  findFirstUserTickets,
  createTicket
};

export default ticketsRepository;
