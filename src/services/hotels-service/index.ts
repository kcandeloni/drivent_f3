import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getHotels(userId: number) {
  const enrolament = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrolament) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrolament.id);
  if (!ticket) {
    throw notFoundError();
  }
  
  const ticketType = ticket.TicketType;
  if(!ticketType.includesHotel || ticketType.isRemote || ticket.status !== "PAID") {
    throw notFoundError();
  }

  const listHotels = await hotelRepository.getHotels();

  if (!listHotels) {
    throw notFoundError();
  }
  return listHotels;
}

async function getHotelById(userId: number, hotelId: number) {
  const enrolament = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrolament) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrolament.id);
  if (!ticket) {
    throw notFoundError();
  }
  
  const ticketType = ticket.TicketType;
  if(!ticketType.includesHotel || ticketType.isRemote || ticket.status !== "PAID") {
    throw notFoundError();
  }

  const hotelRooms = await hotelRepository.getHotelRooms(hotelId);

  if (!hotelRooms) {
    throw notFoundError();
  }
  return hotelRooms;
}

const hotelService = {
  getHotels,
  getHotelById,
};

export default hotelService;
