import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketType() {
  const ticketTypes = await ticketsRepository.findManyTicketTypes();
  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function isUserEnrolled(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  return enrollment.id;
}

async function getTicket(userId: number) {
  const enrollmentId: number = await isUserEnrolled(userId);

  const ticket = await ticketsRepository.findFirstUserTickets(enrollmentId);
  if(!ticket) throw notFoundError();

  return ticket;
}

async function newTicket(ticketTypeId: number, userId: number) {
  const enrollment: number = await isUserEnrolled(userId);
  if (!enrollment) throw notFoundError();

  return ticketsRepository.createTicket(ticketTypeId, userId);
}

export type TicketTypeId = {
  ticketTypeId: number
}

const ticketsService = {
  getTicketType,
  getTicket,
  newTicket
};

export default ticketsService;
