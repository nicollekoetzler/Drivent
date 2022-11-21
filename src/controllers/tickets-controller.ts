import { AuthenticatedRequest } from "@/middlewares";
import getTicketType from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketByType(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await getTicketType();

    return res.send(result).status(httpStatus.OK);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
