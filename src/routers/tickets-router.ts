import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketByType } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketByType);

export { ticketsRouter };
