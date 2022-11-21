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

async function createTicket( ticketTypeId: number, userId: number ) {
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: userId
    }
  });

  await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollment.id,
      status: TicketStatus.RESERVED
    }
  });

  return await findFirstUserTickets(userId);
}

const ticketsRepository = {
  findManyTicketTypes,
  findFirstUserTickets,
  createTicket
};

export default ticketsRepository;
