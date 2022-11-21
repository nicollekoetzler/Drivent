import findManyTicketTypes from "@/repositories/tickets-repository";

export default async function getTicketType() {
  const result = await findManyTicketTypes();

  return result;
}
