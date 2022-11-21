import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketByType, getTickets, postNewTicket } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketByType)
  .get("/", getTickets)
  .post("/", postNewTicket);

export { ticketsRouter };
