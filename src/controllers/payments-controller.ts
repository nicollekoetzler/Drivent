import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;

  try {
    if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payments = await paymentsService.getTicketPayments(userId, ticketId);
    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
