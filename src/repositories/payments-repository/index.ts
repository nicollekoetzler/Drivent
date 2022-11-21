import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findPaymentTicket(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId
    }
  });
}

async function findPayments(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId
    }
  });
}

async function userPayment(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const eventRepository = {
  findPaymentTicket,
  findPayments,
  userPayment
};

export default eventRepository;
