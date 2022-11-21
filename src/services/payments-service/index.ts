import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import { notFoundError, unauthorizedError } from "@/errors";

async function getTicketPayments(userId: number, ticketId: number) {
  const ticket = await paymentsRepository.findPaymentTicket(ticketId);
  
  if(!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw unauthorizedError();

  const payments = await paymentsRepository.findPayments(ticketId);
  
  await paymentsRepository.userPayment(ticket.id);

  return payments;
}

const paymentsService = {
  getTicketPayments
};

export default paymentsService;
